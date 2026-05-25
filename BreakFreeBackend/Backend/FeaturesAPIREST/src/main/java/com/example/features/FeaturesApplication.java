package com.example.features;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.example.features.model") // Forces Spring to look inside your features package for your entities
public class FeaturesApplication {
	public static void main(String[] args) {
		SpringApplication.run(FeaturesApplication.class, args);
	}
}