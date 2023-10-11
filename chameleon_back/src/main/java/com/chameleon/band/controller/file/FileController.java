package com.chameleon.band.controller.file;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chameleon.band.aop.annotation.ValidAspect;
import com.chameleon.band.dto.request.UploadRequestDto;
import com.chameleon.band.dto.request.VidoeRequestDto;
import com.chameleon.band.service.file.FileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
public class FileController {

	private final FileService fileService;
	
	@ValidAspect
	@PostMapping("/upload")
	public ResponseEntity<?> uploadVideo(@Valid UploadRequestDto uploadRequestDto, BindingResult bindingResult){
		return ResponseEntity.ok().body(fileService.uploadVideo(uploadRequestDto.getFile(), uploadRequestDto.getTitle(), uploadRequestDto.getCategoryId()));
	}
	
	@GetMapping("/videos")
	public ResponseEntity<?> getVideos(VidoeRequestDto vidoeRequestDto) {
	    return ResponseEntity.ok().body(fileService.getVideos(vidoeRequestDto.getPage(), vidoeRequestDto.getSearchValue(), vidoeRequestDto.getCategoryId()));
	}

	
	@GetMapping("/playlist")
	public ResponseEntity<?> getPlayList() {
		return ResponseEntity.ok().body(fileService.getPlayList());
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteVideo(int videoId) {
		return ResponseEntity.ok().body(fileService.deleteVideo(videoId));
	}
}
