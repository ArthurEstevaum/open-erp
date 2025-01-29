package com.estevaum.open_erp.controllers;

import com.estevaum.open_erp.DTO.AuthenticationDTO;
import com.estevaum.open_erp.DTO.LoginResponseDTO;
import com.estevaum.open_erp.DTO.RegisterDTO;
import com.estevaum.open_erp.entities.User;
import com.estevaum.open_erp.repositories.UserRepository;
import com.estevaum.open_erp.services.TokenService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    TokenService tokenService;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<Object> register(@RequestBody @Valid RegisterDTO data) {
        if (this.userRepository.findByUsername(data.username()) != null) return ResponseEntity.badRequest().build();
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.username(), encryptedPassword, data.isAdmin());

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/{username}")
    public ResponseEntity<Object> deleteUser(@PathVariable String username) {
        Boolean userExists = userRepository.existsByUsername(username);

        if(userExists) {
            userRepository.deleteByUsername(username);
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().build();
    }
}
