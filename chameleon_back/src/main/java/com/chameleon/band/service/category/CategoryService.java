package com.chameleon.band.service.category;

import java.util.List;

import org.springframework.stereotype.Service;

import com.chameleon.band.dto.response.CategoryResponseDto;
import com.chameleon.band.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

	private final CategoryRepository categoryRepository;
	
	public List<CategoryResponseDto> getCategories() {

		return categoryRepository.getCategories();
	}
}
