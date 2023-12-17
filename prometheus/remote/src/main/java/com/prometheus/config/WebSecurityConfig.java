package com.prometheus.config;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.client.RestTemplate;

import com.prometheus.filter.AuthenticationFilter;
import com.prometheus.security.JwtAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("${prometheus.request.authorized}")
	private String[] permitted;

	@Value("${prometheus.auth.path}")
	private String path;

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Bean
	public AuthenticationFilter jwtAuthenticationFilter() throws Exception {
		return new AuthenticationFilter();
	}

	@Bean
	public WebAuthenticationDetailsSource webAuthenticationDetailsSource() {
		return new WebAuthenticationDetailsSource();
	}

	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		// we don't need CSRF because our token is invulnerable
		httpSecurity.csrf().disable();
		// disable page caching
		httpSecurity.headers().cacheControl();
		// disable frame options
		httpSecurity.headers().frameOptions().disable();
		// register authentication entry point for unauthorized entry
		httpSecurity.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);
		// don't create session
		httpSecurity.sessionManagement().sessionCreationPolicy(STATELESS);
		// allow anonymous resource requests
		httpSecurity.authorizeRequests().antMatchers(GET, permitted).permitAll();
		// authentication requests
		httpSecurity.authorizeRequests().antMatchers(path + "/**").permitAll().anyRequest().authenticated();
		// JWT based security filter
		httpSecurity.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
	}

}
