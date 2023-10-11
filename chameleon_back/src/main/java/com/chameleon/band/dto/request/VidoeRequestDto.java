package com.chameleon.band.dto.request;

import lombok.Data;

@Data
public class VidoeRequestDto {

	private int page;
	private String searchValue;
	private int categoryId;
}
