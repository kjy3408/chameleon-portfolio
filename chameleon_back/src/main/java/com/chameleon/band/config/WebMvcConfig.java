package com.chameleon.band.config;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import com.nimbusds.jose.util.StandardCharset;

@Configuration
@EnableWebSecurity
public class WebMvcConfig implements WebMvcConfigurer{

	@Value("${file.path}")
	private String filePath;
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("*")
				.allowedMethods("*");
				//.allowedOrigins("http://localhost:3000");
	}
	
	 @Override
	    public void addResourceHandlers(ResourceHandlerRegistry registry) {
	       WebMvcConfigurer.super.addResourceHandlers(registry);
	       String absolutePath = Paths.get("").toAbsolutePath().toString().replace("\\", "/");
	       String resourcePath = absolutePath + filePath;
	       registry.addResourceHandler("/videos/**")
	             .addResourceLocations("file:///" + resourcePath)
	             .resourceChain(true)
	             .addResolver(new PathResourceResolver() {
	                @Override
	                protected Resource getResource(String resourcePath, Resource location) throws IOException {
	                   resourcePath = URLDecoder.decode(resourcePath, StandardCharset.UTF_8);
	                   return super.getResource(resourcePath, location);
	                }
	             });
	    }
}
