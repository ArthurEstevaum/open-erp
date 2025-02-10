package com.estevaum.open_erp.DTO;

import java.util.List;

public record PermissionsUsersDTO(UserProfileDTO user, List<UserPermissionsDTO> permissions) {
}
