package ru.an.pp33.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.an.pp33.dto.UserFromClient;
import ru.an.pp33.models.Role;
import ru.an.pp33.models.User;

import java.util.HashSet;
import java.util.Set;

@Component
public class UserMapper {
    private final PasswordEncoder passwordEncoder;

    public UserMapper(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User toUser(UserFromClient userDto) {
        Set<Role> roles = new HashSet<>();
        userDto.getRoles().forEach(r -> roles.add(new Role(r)));
        return new User(
                userDto.getFirstname(),
                userDto.getLastname(),
                userDto.getEmail(),
                passwordEncoder.encode(userDto.getPassword()),
                userDto.getBirthdate(),
                roles,
                userDto.isLocked()
        );
    }
}
