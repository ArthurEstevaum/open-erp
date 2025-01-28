package com.estevaum.open_erp.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Table(name = "users")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@EqualsAndHashCode(of = "id")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    private String password;
    private Boolean isAdmin;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_permissions",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id"))
    Set<Permission> permissions;

    public User(String username, String encryptedPassword, Boolean admin) {
        this.username = username;
        this.password = encryptedPassword;
        this.isAdmin = admin;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.isAdmin) {
            return List.of(new SimpleGrantedAuthority("ROLE_admin"));
        }
        var permissionsAuthority = permissions.stream().map(authority -> new SimpleGrantedAuthority("ROLE_" + authority.getName()));
        return permissionsAuthority.toList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
