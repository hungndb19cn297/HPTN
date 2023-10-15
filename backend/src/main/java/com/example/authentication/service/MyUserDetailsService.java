package com.example.authentication.service;

import com.example.authentication.entity.User;
import com.example.authentication.repository.UserRepository;
import com.example.authentication.security.MyUserDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public MyUserDetail loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findOneByEmail(username);
        if (user == null)
            throw new UsernameNotFoundException("User " + username + " not found.");
        return new MyUserDetail(user, user.getId(), user.getEmail(), user.getPassword(), Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
    }

    public MyUserDetail loadUserById(Integer userId) {
        User user = userRepository.findOneById(userId);
        if (user == null)
            throw new UsernameNotFoundException("Id " + userId + " not found.");
        return new MyUserDetail(user, user.getId(), user.getEmail(), "null", Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
