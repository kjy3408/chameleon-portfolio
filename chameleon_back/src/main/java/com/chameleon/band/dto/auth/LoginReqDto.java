package com.chameleon.band.dto.auth;

import lombok.Data;

@Data
public class LoginReqDto {
	
	private String email;
	
	private String password;
}
