package com.prometheus.service;

import static com.prometheus.domain.JwtRole.ROLE_ADMIN;
import static com.prometheus.domain.JwtRole.ROLE_USER;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.prometheus.domain.JwtAccount;
import com.prometheus.domain.JwtApplication;
import com.prometheus.domain.JwtAuthority;
import com.prometheus.domain.JwtUser;
import com.prometheus.domain.repo.JwtAccountRepo;
import com.prometheus.domain.repo.JwtApplicationRepo;
import com.prometheus.domain.repo.JwtUserRepo;
import com.prometheus.email.Emailer;
import com.prometheus.exception.ConfirmPasswordException;
import com.prometheus.exception.DecodeTokenException;
import com.prometheus.exception.EmailSendException;
import com.prometheus.exception.EncodeTokenException;
import com.prometheus.exception.RegistrationTokenExpiredException;
import com.prometheus.exception.UserWithEmailAlreadyExistsException;
import com.prometheus.exception.UsernameAlreadyExistsException;
import com.prometheus.request.AuthenticationRequest;
import com.prometheus.request.RegistrationRequest;
import com.prometheus.request.VerifyRequest;
import com.prometheus.response.ResponseStatus;
import com.prometheus.security.JwtAuthUtility;
import com.prometheus.security.JwtUserDetails;
import com.prometheus.utility.CryptoUtility;

@Service
public class AuthenticationService {

	private final static String EMAIL_VERIFICATION_TYPE = "EMAIL_VERIFICATION";

	private static Boolean firstUser = true;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtApplicationRepo jwtApplicationRepo;

	@Autowired
	private JwtAccountRepo jwtAccountRepo;

	@Autowired
	private JwtUserRepo jwtUserRepo;

	@Autowired
	private JwtAuthUtility jwtAuthUtility;

	@Autowired
	private Emailer emailer;

	@Autowired
	private CryptoUtility cryptoUtility;

	@Value("${prometheus.ui.registration.url}")
	private String uiRegistrationURL;

	@Value("${prometheus.registration.token.duration}")
	private int tokenDuration;

	public String application(String name, String description) {
		if (!jwtApplicationRepo.findByName(name).isPresent()) {
			jwtApplicationRepo.save(new JwtApplication(name, description));
		}
		return name;
	}

	public String verify(VerifyRequest verifyRequest) {
		if (jwtAccountRepo.findByEmail(verifyRequest.getEmail()).isPresent()) {
			throw new UserWithEmailAlreadyExistsException(verifyRequest.getEmail());
		}

		jwtAccountRepo.save(new JwtAccount(verifyRequest.getEmail(), verifyRequest.getFirstName(), verifyRequest.getLastName()));

		String token;

		try {
			token = cryptoUtility.generateToken(verifyRequest.getEmail(), EMAIL_VERIFICATION_TYPE);
		} catch (InvalidKeyException | NoSuchAlgorithmException | NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException e) {
			throw new EncodeTokenException();
		}

		String link = uiRegistrationURL + "?token=" + token;

		String subject = "Prometheus Registration";

		String content = String.join("", verifyRequest.getFirstName(), " ", verifyRequest.getLastName(), ",\n\nFollow the link to continue registration.\n\n", link, "\n\nThank You,\nPrometheus");

		try {
			emailer.sendEmail(verifyRequest.getEmail(), subject, content);
		} catch (MessagingException e) {
			throw new EmailSendException();
		}

		return ResponseStatus.SUCCESS.toString();
	}

	public String register(RegistrationRequest registrationRequest) {
		String[] encodedData;
		try {
			encodedData = cryptoUtility.validateToken(registrationRequest.getToken(), EMAIL_VERIFICATION_TYPE);
		} catch (InvalidKeyException | NoSuchAlgorithmException | NoSuchPaddingException | IllegalBlockSizeException | BadPaddingException e) {
			throw new DecodeTokenException();
		}

		if (jwtUserRepo.findByUsername(registrationRequest.getUsername()).isPresent()) {
			throw new UsernameAlreadyExistsException(registrationRequest.getUsername());
		}

		String tokenCreateTime = encodedData[0];

		String email = encodedData[1];

		if (TimeUnit.MILLISECONDS.toDays(Long.valueOf(tokenCreateTime) - new Date().getTime()) >= tokenDuration) {
			throw new RegistrationTokenExpiredException();
		}

		if (!registrationRequest.getPassword().equals(registrationRequest.getConfirm())) {
			throw new ConfirmPasswordException();
		}

		registrationRequest.setPassword(passwordEncoder.encode(registrationRequest.getConfirm()));

		activateJwtAccountWithUser(email, createJwtUserWithAuthority(registrationRequest));

		return ResponseStatus.SUCCESS.toString();
	}

	private JwtUser createJwtUserWithAuthority(RegistrationRequest registrationRequest) {
		JwtUser jwtUser = new JwtUser(registrationRequest);

		JwtAuthority authority = new JwtAuthority();

		jwtApplicationRepo.findAll().forEach(application -> {
			authority.addApplication(application);
		});

		if (firstUser) {
			authority.setRole(ROLE_ADMIN);
			firstUser = false;
		} else {
			authority.setRole(ROLE_USER);
		}

		jwtUser.addAuthority(authority);
		return jwtUser;
	}

	private void activateJwtAccountWithUser(String email, JwtUser jwtUser) {
		JwtAccount jwtAccount = jwtAccountRepo.findByEmail(email).get();
		jwtUser.setAccount(jwtAccount);
		jwtAccount.setUser(jwtUserRepo.save(jwtUser));
		jwtAccount.setActive(true);
		jwtAccountRepo.save(jwtAccount);
	}

	public String token(AuthenticationRequest authenticationRequest) {
		SecurityContextHolder.getContext().setAuthentication(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())));
		return jwtAuthUtility.generateToken((JwtUserDetails) userDetailsService.loadUserByUsername(authenticationRequest.getUsername()));
	}

	public String refresh(String token) {
		return jwtAuthUtility.refreshToken(token);
	}

	public JwtUserDetails user(String token) {
		return jwtAuthUtility.getUserDetailsFromToken(token);
	}

}
