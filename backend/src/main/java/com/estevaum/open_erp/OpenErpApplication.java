package com.estevaum.open_erp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class OpenErpApplication {

	public static void main(String[] args) {
		SpringApplication.run(OpenErpApplication.class, args);
	}

	@GetMapping("/")
	public String hello() {
		return "Hello estevaum!";
	}
}
