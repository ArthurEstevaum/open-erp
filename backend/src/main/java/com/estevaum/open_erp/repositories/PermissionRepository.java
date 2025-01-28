package com.estevaum.open_erp.repositories;

import com.estevaum.open_erp.entities.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    public Permission findByName(String name);
    public Boolean existsByName(String name);
}
