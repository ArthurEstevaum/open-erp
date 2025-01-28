package com.estevaum.open_erp.controllers;

import com.estevaum.open_erp.DTO.PermissionManagementDTO;
import com.estevaum.open_erp.DTO.PermissionsUsersDTO;
import com.estevaum.open_erp.DTO.UserPermissionsDTO;
import com.estevaum.open_erp.DTO.UserProfileDTO;
import com.estevaum.open_erp.entities.Permission;
import com.estevaum.open_erp.entities.User;
import com.estevaum.open_erp.repositories.PermissionRepository;
import com.estevaum.open_erp.repositories.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PermissionController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PermissionRepository permissionRepository;

    @GetMapping("/users/permissions/{username}")
    public List<UserPermissionsDTO> userPermissions(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        return user.getPermissions().stream().map(permission -> new UserPermissionsDTO(permission.getId(), permission.getName())).toList();
    }

    @GetMapping("/users/permissions")
    public List<PermissionsUsersDTO> permissionsUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> {
            List<UserPermissionsDTO> userPermissions = user.getPermissions().stream().map(permission -> new UserPermissionsDTO(permission.getId(), permission.getName())).toList();
            UserProfileDTO userProfile = new UserProfileDTO(user.getId(), user.getUsername(), user.getIsAdmin());
            return new PermissionsUsersDTO(userProfile, userPermissions);
        }).toList();
    }

    @PostMapping("/users/permissions")
    public ResponseEntity<Object> createPermissions(@RequestBody @Valid PermissionManagementDTO permissionData) {
        Boolean userExists = userRepository.existsByUsername(permissionData.username());
        List<String> existentPermissions = permissionData.permissionList().stream().filter((permission) -> {
           return permissionRepository.existsByName(permission);
        }).toList();
        List<Permission> newPermissions = existentPermissions.stream().map(permission -> permissionRepository.findByName(permission)).toList();
        if(userExists && !existentPermissions.isEmpty()) {
            User user = userRepository.findByUsername(permissionData.username());
            user.getPermissions().addAll(newPermissions);
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/users/permissions")
    public ResponseEntity<Object> deletePermissions(@RequestBody @Valid PermissionManagementDTO permissionData) {
        Boolean userExists = userRepository.existsByUsername(permissionData.username());
        List<String> existentPermissions = permissionData.permissionList().stream().filter((permission) -> {
            return permissionRepository.existsByName(permission);
        }).toList();
        List<Permission> permissionsToDelete = existentPermissions.stream().map(permission -> permissionRepository.findByName(permission)).toList();
        if(userExists && !existentPermissions.isEmpty()) {
            User user = userRepository.findByUsername(permissionData.username());
            permissionsToDelete.forEach(user.getPermissions()::remove);
            userRepository.save(user);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
