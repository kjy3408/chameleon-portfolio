package com.chameleon.band.service;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.chameleon.band.dto.auth.LoginReqDto;
import com.chameleon.band.dto.auth.SignupDto;
import com.chameleon.band.entity.Authority;
import com.chameleon.band.entity.User;
import com.chameleon.band.exception.CustomException;
import com.chameleon.band.exception.ErrorMap;
import com.chameleon.band.repository.UserRepository;
import com.chameleon.band.security.PrincipalUser;
import com.chameleon.band.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService {
	private final UserRepository userRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenProvider jwtTokenProvider;
	
	public void checkDuplicatedEmail(String email) {
		if(userRepository.findUserByEmail(email) != null) {
			throw new CustomException("Duplicated Email", 
					ErrorMap.builder().put("email", "사용중인 이메일입니다").build());
		}
	}
	
	public void signup(SignupDto signupDto) {
		
		if(misMatchPassword(signupDto)) {
			throw new CustomException("error", 
					ErrorMap.builder().put("password", "비밀번호가 일치하지 않습니다.").build());
		}
		
		User userEntity = signupDto.toEntity();
		userRepository.saveUser(userEntity);
		
		userRepository.saveAuthority(Authority.builder()
				.userId(userEntity.getUserId())
				.roleId(2)
				.build());
	}
	
	public boolean misMatchPassword(SignupDto signupDto) {
		return !signupDto.getPassword().equals(signupDto.getCheckPassword());
	}
	
	public String signin(LoginReqDto loginReqDto) {
		UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword());
		
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
		
		return jwtTokenProvider.generateToken(authentication);
	}
	
	public PrincipalUser getUserInfo(String accessToken) {
		try {
			String email = jwtTokenProvider.getClaims(jwtTokenProvider.getToken(accessToken)).get("email").toString();
			User userEntity = userRepository.findUserByEmail(email); 
			System.out.println("getUserInfo");
			return userEntity.toPrincipal();
			
		} catch (Exception e) {
			return null;
		}
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User userEntity = userRepository.findUserByEmail(username);
		
		return userEntity.toPrincipal();
	}
	
	public boolean authenticate(String accessToken) {
		return jwtTokenProvider.validateToken(jwtTokenProvider.getToken(accessToken));
	}

	public int userDelete(User user) {
		userRepository.userDelete(user);
		return userRepository.userDelete(user);
	}

	public String checkUserPermission() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();	    
			String role = principalUser.getAuthorities().stream()
					.map(GrantedAuthority::getAuthority)
					.filter(authority -> authority.startsWith("ROLE_")) 
					.map(authority -> authority.substring(5)) 
					.findFirst()
					.orElse(""); 			
			return role;
		}catch(Exception e) {
			return "USER";			
		}
	}
}
