package com.chameleon.band.entity;

import java.util.List;

import com.chameleon.band.security.PrincipalUser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
	private int userId;
	private String email;
	private String password;
	private String name;
	private String provider;
	
	private List<Authority> authorities;
	
	public PrincipalUser toPrincipal() {
		return PrincipalUser.builder()
				.userId(userId)
				.email(email)
				.name(name)
				.password(password)
				.authorities(authorities)
				.build();
	}
	
}
