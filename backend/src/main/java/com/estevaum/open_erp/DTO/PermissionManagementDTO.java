package com.estevaum.open_erp.DTO;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record PermissionManagementDTO(@NotNull List<String> permissionList, @NotNull String username) {
}
