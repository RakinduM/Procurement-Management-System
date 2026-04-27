package com.procurement.userservice.security;

import com.procurement.userservice.model.Role;
import com.procurement.userservice.model.User;
import com.procurement.userservice.repository.RoleRepository;
import com.procurement.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        
        String roleName = "ROLE_USER";
        if (user.getRoleId() != null) {
            roleName = roleRepository.findById(user.getRoleId())
                    .map(Role::getRoleName)
                    .map(name -> name.startsWith("ROLE_") ? name : "ROLE_" + name)
                    .orElse("ROLE_USER");
        }
        
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.isActive(),
                true,
                true,
                true,
                Collections.singletonList(new SimpleGrantedAuthority(roleName))
        );
    }
}
