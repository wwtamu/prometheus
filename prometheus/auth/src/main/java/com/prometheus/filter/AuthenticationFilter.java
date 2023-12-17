package com.prometheus.filter;

import static com.prometheus.constants.Constants.DEFAULT_CHARACTER_ENCODING;
import static com.prometheus.constants.Constants.DEFAULT_CONTENT_TYPE;
import static com.prometheus.constants.Constants.EXPIRED_TOKEN_MESSAGE;
import static com.prometheus.constants.Constants.TOKEN_HEADER;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.prometheus.exception.ExpiredTokenException;
import com.prometheus.security.JwtAuthUtility;
import com.prometheus.security.JwtUserDetails;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtAuthUtility jwtAuthUtility;

	@Autowired
	private WebAuthenticationDetailsSource webAuthenticationDetailsSource;

	@Value("${prometheus.auth.path}")
	private String path;

	@Value("${prometheus.refresh}")
	private String refresh;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
		String token = request.getHeader(TOKEN_HEADER);

		Boolean doFilter = true;

		if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			JwtUserDetails userDetails = null;

			try {
				userDetails = jwtAuthUtility.getUserDetailsFromToken(token);
				if (userDetails.isExpired() && !request.getRequestURI().equals(path + refresh)) {
					throw new ExpiredTokenException();
				}
			} catch (ExpiredTokenException exception) {
				response.setStatus(UNAUTHORIZED.value());
				response.setContentType(DEFAULT_CONTENT_TYPE);
				response.setCharacterEncoding(DEFAULT_CHARACTER_ENCODING);
				response.getWriter().append(EXPIRED_TOKEN_MESSAGE);
				doFilter = false;
			}

			if (doFilter) {
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
				authentication.setDetails(webAuthenticationDetailsSource.buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}

		if (doFilter) {
			chain.doFilter(request, response);
		}
	}

}
