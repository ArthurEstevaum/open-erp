package com.estevaum.open_erp.repositories;

import com.estevaum.open_erp.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUsername(String username);
    public Boolean existsByUsername(String username);
    @Transactional
    public void deleteByUsername(String username);
}
