package com.chameleon.band.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.chameleon.band.security.jwt.JwtAuthenticationEntryPoint;
import com.chameleon.band.security.jwt.JwtAuthenticationFilter;
import com.chameleon.band.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter{

	private final JwtTokenProvider jwtTokenProvider;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
	    http.cors();
	    http.csrf().disable();
	    http.httpBasic().disable();
	    http.formLogin().disable();
	    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

	    http.authorizeRequests()
	        .antMatchers("/auth/**", "/file/videos**", "/file/playlist/**", "/videos/**", "/categories/**")
	        .permitAll() 
	        .anyRequest()
	        .authenticated()
	        .and()
	        .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
	        .exceptionHandling()
	        .authenticationEntryPoint(jwtAuthenticationEntryPoint);
	}

}
