package com.estevaum.open_erp;

import com.estevaum.open_erp.repositories.UserRepository;
import com.estevaum.open_erp.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
