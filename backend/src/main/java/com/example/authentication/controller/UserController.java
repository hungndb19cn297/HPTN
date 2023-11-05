package com.example.authentication.controller;

import com.example.authentication.dto.user.UserDataDto;
import com.example.authentication.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@CrossOrigin(origins = "*")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/pub")
    public UserDataDto getUserData(@RequestParam Integer userId){
        return userService.getUserData(userId);
    }
}
