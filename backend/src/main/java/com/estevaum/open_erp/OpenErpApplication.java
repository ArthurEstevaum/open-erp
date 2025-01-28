package com.estevaum.open_erp;

import com.estevaum.open_erp.DTO.AuthenticationDTO;
import com.estevaum.open_erp.DTO.LoginResponseDTO;
import com.estevaum.open_erp.DTO.RegisterDTO;
import com.estevaum.open_erp.entities.User;
import com.estevaum.open_erp.repositories.PermissionRepository;
import com.estevaum.open_erp.repositories.UserRepository;
import com.estevaum.open_erp.services.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SpringBootApplication
@RestController
public class OpenErpApplication {

	@Autowired
	UserRepository userRepository;
	@Autowired
	PermissionRepository permissionRepository;
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	TokenService tokenService;

	public static void main(String[] args) {
		SpringApplication.run(OpenErpApplication.class, args);
	}

	@GetMapping("/")
	public String hello() {
		return "Hello estevaum!";
	}

	@PostMapping("/auth/login")
	public ResponseEntity<Object> login(@RequestBody @Valid AuthenticationDTO data) {
		var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
		var auth = this.authenticationManager.authenticate(usernamePassword);
		var token = tokenService.generateToken((User) auth.getPrincipal());

		return ResponseEntity.ok(new LoginResponseDTO(token));
	}

	@PostMapping("/auth/register")
	public ResponseEntity<Object> register(@RequestBody @Valid RegisterDTO data) {
		if(this.userRepository.findByUsername(data.username()) != null) return ResponseEntity.badRequest().build();
		String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
		User newUser = new User(data.username(), encryptedPassword, data.isAdmin());

		this.userRepository.save(newUser);

		return ResponseEntity.ok().build();
	}
}
