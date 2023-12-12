package ru.an.pp33.dto;

import lombok.Data;
import ru.an.pp33.models.Role;

import java.util.Calendar;
import java.util.Set;

@Data
public class UserFromClient {
    private long id;
    private String firstname;
    private String lastname;
    private Calendar birthdate;
    private String email;
    private boolean locked;
    private String password;
    private Set<String> roles;
}
