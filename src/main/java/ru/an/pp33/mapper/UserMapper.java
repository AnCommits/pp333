package ru.an.pp33.mapper;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.an.pp33.dto.FrontUser;
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

    public User toUser(FrontUser userDto) {
        Set<Role> roles = new HashSet<>();
        userDto.getRoles().forEach(r -> roles.add(new Role(r)));
        User user = new User(
                userDto.getFirstname(),
                userDto.getLastname(),
                userDto.getEmail(),
                passwordEncoder.encode(userDto.getPassword()),
                userDto.getBirthdate(),
                roles,
                userDto.isLocked()
        );
        user.setId(userDto.getId());
        return user;
    }
}
