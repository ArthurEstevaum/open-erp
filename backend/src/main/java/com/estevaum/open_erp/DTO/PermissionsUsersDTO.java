package com.estevaum.open_erp.DTO;

import com.estevaum.open_erp.entities.Permission;

import java.util.List;

public record PermissionsUsersDTO(UserProfileDTO user, List<UserPermissionsDTO> permissions) {
}
