package com.example.authentication.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
@Setter
public class MyUserDetail extends User {
    private com.example.authentication.entity.User user;

    private Integer id;

    @Override
    public boolean isAccountNonLocked() {
        return !user.getIsLocked();
    }

    public MyUserDetail(com.example.authentication.entity.User user, Integer id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.user = user;
        this.id = id;
    }
}
