package com.chameleon.band.service;

import java.util.HashMap;
import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.chameleon.band.dto.account.FindEmailReqDto;
import com.chameleon.band.dto.account.PasswordChangeDto;
import com.chameleon.band.dto.account.ResetPasswordReqDto;
import com.chameleon.band.entity.User;
import com.chameleon.band.exception.CustomException;
import com.chameleon.band.exception.ErrorMap;
import com.chameleon.band.repository.UserRepository;
import com.chameleon.band.security.PrincipalUser;
import com.chameleon.band.util.cache.CacheTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {
	
	@Value("${file.path}")
	private String filePath;
	
	private final UserRepository userRepository;
	private final JavaMailSender javaMailSender;
	private final CacheTokenProvider cacheTokenProvider;
	
	
	
	
	public String findEmail(FindEmailReqDto findEmailReqDto) {
		Map<String, Object> map = new HashMap<>();
		
		map.put("name", findEmailReqDto.getName());
		map.put("phone", findEmailReqDto.getPhone());
		
		User userEntity = userRepository.findUserByNameAndPhone(map);
		
		if(userEntity == null) {
			throw new CustomException("Undefind User", 
					ErrorMap.builder().put("error", "사용자를 찾을 수 없습니다.").build());
		}
	
		return userEntity.getEmail();
	}
	
	public int resetPassword(ResetPasswordReqDto resetPasswordReqDto) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		if(misMatchResetPassword(resetPasswordReqDto)) {
			throw new CustomException("MisMatchPassword", 
					ErrorMap.builder().put("error", "비밀번호가 일치하지 않습니다.").build());
		}
		
		Map<String, Object> tokenMap = cacheTokenProvider.getTokenMap("passwordResetToken", resetPasswordReqDto.getToken());
		cacheTokenProvider.validateToken(tokenMap);
		
		User userEntity = cacheTokenProvider.findUserByToken(resetPasswordReqDto.getToken());
		userEntity.setPassword(new BCryptPasswordEncoder().encode(resetPasswordReqDto.getPassword()));
		
		cacheTokenProvider.removeToken("passwordResetToken", resetPasswordReqDto.getToken());
		
		return userRepository.updatePassword(userEntity);
	}
	
	public boolean misMatchResetPassword(ResetPasswordReqDto resetPasswordReqDto) {
		return !resetPasswordReqDto.getPassword().equals(resetPasswordReqDto.getCheckPassword());
	}
	
	public void sendUpdatePasswordEmail(String email) {
		String subject = "비밀번호 재설정 안내";
		String token = cacheTokenProvider.generateResetPasswordToken(email);
		String url = "http://localhost:3000/auth/resetpassword?"
													+ "token=" + token;
		
		String text = "아래 링크를 클릭하여 비밀번호를 다시 설정해주세요." 
				 		+ url;
		
		sendEmail(email, subject, text);
	}
	

	public void sendEmail(String to, String subject, String text) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
            javaMailSender.send(message);
        } catch (Exception e) {
        	System.out.println(e);
        }
	}
	
	public void updatePassword(PasswordChangeDto passwordChangeDto) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		PrincipalUser principalUser = (PrincipalUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
	    if (!StringUtils.hasText(passwordChangeDto.getCurrentPassword())) {
	        throw new CustomException("MisMatchPassword", 
	            ErrorMap.builder().put("currentPassword", "비밀번호를 입력해주세요.").build());
	    }
	    
		if(!encoder.matches(passwordChangeDto.getCurrentPassword(),principalUser.getPassword())) {
			throw new CustomException("MisMatchPassword", 
					ErrorMap.builder().put("currentPassword", "현재 비밀번호가 일치하지 않습니다").build());
			
		}
		
		if(!passwordChangeDto.getUpdatePassword().equals(passwordChangeDto.getUpdateCheckPassword())) {
			throw new CustomException("MisMatchPassword", 
					ErrorMap.builder().put("updatePassword", "새 비밀번호와 비밀번호 확인이 일치하지 않습니다.").build());
		}
		String password = (new BCryptPasswordEncoder().encode(passwordChangeDto.getUpdateCheckPassword()));
		int userId = principalUser.getUserId();
		
		User userEntity = User.builder()
							.userId(userId)
							.password(password)
							.build();
		userRepository.updatePassword(userEntity);

	}
}
