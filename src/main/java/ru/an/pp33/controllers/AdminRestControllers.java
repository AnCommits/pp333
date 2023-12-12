package ru.an.pp33.controllers;

import lombok.Data;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.an.pp33.constants.RolesType;
import ru.an.pp33.dto.UserFromClient;
import ru.an.pp33.helper.UserUtils;
import ru.an.pp33.mapper.UserMapper;
import ru.an.pp33.models.User;
import ru.an.pp33.service.UserService;

import java.util.List;

@Data
@RestController
@RequestMapping("/admin/api")
public class AdminRestControllers {
    private final UserService userService;
    private final UserUtils userUtils;
    private final UserMapper userMapper;

    public AdminRestControllers(UserService userService, UserUtils userUtils, UserMapper userMapper) {
        this.userService = userService;
        this.userUtils = userUtils;
        this.userMapper = userMapper;
    }

    @GetMapping("/get-all-users")
    public List<User> getAllUsers(Authentication authentication) {
        List<User> users = userService.getAllUsers();
        User me = (User) authentication.getPrincipal();
        // ToDo isAncestor достаточно устанавливать только для админов
        users.forEach(u -> u.setDescendant(userUtils.isAncestor(u, me)));
        return users;
    }

    @GetMapping("/all-roles")
    public List<String> getAllRoles() {
        return RolesType.allRolesNames;
    }

    @PutMapping("/lock/{id}")
    public void lockUser(@PathVariable long id, @RequestBody String lock) {
        User user = userService.getUserById(id);
        user.setLocked(Boolean.parseBoolean(lock));
        userService.updateUser(user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable long id) {
        userService.removeUserById(id);
    }

    @PostMapping("/save-user")
    public String saveUser(@RequestBody UserFromClient userDto, Authentication authentication) {
        User me = (User) authentication.getPrincipal();
        User user = userMapper.toUser(userDto);
        user.setParentAdminId(me.getId());
        userService.saveUser(user);
        return String.format("{\"id\": %d, \"password\": \"%s\"}", user.getId(), user.getPassword());
    }

    @PutMapping("/update")
    public String updateUser(@RequestBody UserFromClient userDto) {
        User user = userMapper.toUser(userDto);
//                          ToDo    Check admin's rights and set parentAdminId
        userService.updateUser(user);
        return user.getPassword();
    }

//    @GetMapping("/{id}")
//    public User getUserById(@PathVariable long id) {
//        User user = userService.getUserById(id);
//        if (user != null) {
//            return user;
//        }
//        throw new RuntimeException("User with " + id + " not found");
//    }
}
