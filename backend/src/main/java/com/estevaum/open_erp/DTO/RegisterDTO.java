package com.estevaum.open_erp.DTO;

import jakarta.validation.constraints.NotNull;

public record RegisterDTO(@NotNull String username, @NotNull String password, @NotNull Boolean isAdmin) {
}
