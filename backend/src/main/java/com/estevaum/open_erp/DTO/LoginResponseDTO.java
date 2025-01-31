package com.estevaum.open_erp.DTO;

import java.util.List;

public record LoginResponseDTO(String token, List<String> permissions) {
}
