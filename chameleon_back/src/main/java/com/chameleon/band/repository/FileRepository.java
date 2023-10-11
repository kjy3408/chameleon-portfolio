package com.chameleon.band.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.chameleon.band.dto.response.VideoResponseDto;

@Mapper
public interface FileRepository {

	public int uploadVideo(Map<String, Object> map);
	public int getTotalCount(Map<String, Object> map);
	public int getSelectCategoryCount(Map<String, Object> map);
	public List<VideoResponseDto> getVideos(Map<String, Object> map);
	public List<VideoResponseDto> getPlayList();
	public String getVideoName(int videoId);
	public int deleteVideo(int videoId);
}
