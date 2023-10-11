package com.chameleon.band.dto.request;

import javax.validation.constraints.NotBlank;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UploadRequestDto {

	private MultipartFile file;
	
	@NotBlank(message = "제목을 입력하세요.")
	private String title;
	
	@NotBlank(message = "카테고리를 선택하세요.")
	private String categoryId;
}
