package com.chameleon.band.service.file;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.chameleon.band.dto.response.VideoResponseDto;
import com.chameleon.band.exception.CustomException;
import com.chameleon.band.exception.ErrorMap;
import com.chameleon.band.repository.FileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileService {

	@Value("${file.path}")
	private String filePath;
	
	private final FileRepository fileRepository;
	
	public int uploadVideo(MultipartFile file, String title, String categoryId) {
		Map<String, Object> map = new HashMap<>();
		
		String originFileName = file.getOriginalFilename();
		String extension = originFileName.substring(originFileName.lastIndexOf("."));
		String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + extension;
		
	    String absolutePath = Paths.get("").toAbsolutePath().toString().replace("\\", "/");
		String resourcePath = absolutePath + filePath + "band/" + tempFileName;
		Path uploadPath = Paths.get(resourcePath);
		
		try {
			Files.write(uploadPath, file.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}

		map.put("fileName", tempFileName);
		map.put("title", title);
		map.put("categoryId", categoryId);
		
		return fileRepository.uploadVideo(map);
	}
	
	public Map<String, Object> getVideos(int page, String searchValue, int categoryId) {
		List<VideoResponseDto> videoList = new ArrayList<>();
		List<VideoResponseDto> playList = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		Map<String, Object> responseMap = new HashMap<>();
		
		map.put("index", (page - 1) * 3);
		map.put("searchValue", searchValue);
		map.put("categoryId", categoryId);
		
		fileRepository.getVideos(map).forEach(video -> {
			videoList.add(video);
		});
		int totalCount = fileRepository.getTotalCount(map);
		responseMap.put("totalCount", fileRepository.getSelectCategoryCount(map));
		responseMap.put("videos", videoList);
				
		return responseMap;
	}
	
	public List<VideoResponseDto> getPlayList() {
		
		return fileRepository.getPlayList();
	}
	
	public int deleteVideo(int videoId) {
		String tempFileName = fileRepository.getVideoName(videoId);
		String absolutePath = Paths.get("").toAbsolutePath().toString().replace("\\", "/");
		String resourcePath = absolutePath + filePath + "band/" + tempFileName;

		try {
	        Path fileToDelete = Paths.get(resourcePath);
	        Files.deleteIfExists(fileToDelete);
	        System.out.println("파일 삭제 성공: " + resourcePath);
	    } catch (IOException e) {
	        e.printStackTrace();
	        System.out.println("파일 삭제 실패: " + resourcePath);
	    }
	    
		
		return fileRepository.deleteVideo(videoId);
	}
}
