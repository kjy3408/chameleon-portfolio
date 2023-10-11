package com.chameleon.band.repository;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.chameleon.band.entity.Authority;
import com.chameleon.band.entity.User;

@Mapper
public interface UserRepository {
	public User findUserByEmail(String email);
	public User findUserByNameAndPhone(Map<String, Object> map);
	public int saveUser(User user);
	public int saveAuthority(Authority authority);
	public int updateProvider(User user);
	public int updatePassword(User user);
	public int userDelete(User user);
	public int updateProfileImg(User user);
}
