package com.estevaum.open_erp.repositories;

import com.estevaum.open_erp.entities.Permission;
import com.estevaum.open_erp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUsername(String username);
    public Boolean existsByUsername(String username);
}
