package com.chameleon.band.controller;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chameleon.band.aop.annotation.ValidAspect;
import com.chameleon.band.dto.account.FindEmailReqDto;
import com.chameleon.band.dto.account.PasswordChangeDto;
import com.chameleon.band.dto.account.ResetPasswordReqDto;
import com.chameleon.band.service.AccountService;
import com.chameleon.band.util.cache.CacheTokenProvider;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AccountController {
	
	private final AccountService accountService;
	private final CacheTokenProvider cacheTokenProvider;
	
	@GetMapping("/findemail")
	public ResponseEntity<?> findEmail(FindEmailReqDto findEmailReqDto) {
		return ResponseEntity.ok().body(accountService.findEmail(findEmailReqDto));
	}
	
	@PostMapping("/findpassword")
	public ResponseEntity<?> findPassword(@RequestBody Map<String, String> requestMap) {
		accountService.sendUpdatePasswordEmail(requestMap.get("email"));
		return ResponseEntity.ok(true);
	}
	
	@ValidAspect
	@PutMapping("/resetpassword")
	public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordReqDto resetPasswordReqDto, BindingResult bindingResult) {
		return ResponseEntity.ok().body(accountService.resetPassword(resetPasswordReqDto));
	}
	
	@GetMapping("/resetpassword/validatetoken")
	public ResponseEntity<?> validatetoken(@RequestParam String token) {
		cacheTokenProvider.validateToken(cacheTokenProvider.getTokenMap("passwordResetToken", token));
		return ResponseEntity.ok(true);
	}
	
	@ValidAspect
	@PutMapping("/updatepassword")
	public ResponseEntity<?> passwordChange(@Valid @RequestBody PasswordChangeDto passwordChangeDto, BindingResult bindingResult){
		accountService.updatePassword(passwordChangeDto);
		
		return ResponseEntity.ok().body(null);
	}
	

}
