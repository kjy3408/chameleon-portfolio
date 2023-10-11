package com.chameleon.band.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.chameleon.band.dto.response.CategoryResponseDto;

@Mapper
public interface CategoryRepository {

	public List<CategoryResponseDto> getCategories();
}
