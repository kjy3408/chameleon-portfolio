package com.chameleon.band.controller.category;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chameleon.band.service.category.CategoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CategoryController {

	private final CategoryService categoryService;
	
	@GetMapping("/categories")
	public ResponseEntity<?> getCategories() {
		
		return ResponseEntity.ok().body(categoryService.getCategories());
	}
}
