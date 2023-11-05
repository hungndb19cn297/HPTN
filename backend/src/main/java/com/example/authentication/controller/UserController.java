package com.example.authentication.controller;

import com.example.authentication.dto.user.UserDataDto;
import com.example.authentication.exception.ApiException;
import com.example.authentication.model.ErrorMessage;
import com.example.authentication.security.MyUserDetail;
import com.example.authentication.service.FileService;
import com.example.authentication.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("users")
@CrossOrigin(origins = "*")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;

    @GetMapping("/pub")
    public UserDataDto getUserData(@RequestParam Integer userId){
        return userService.getUserData(userId);
    }

    @PostMapping("avatar")
    public String setAvatar(MultipartFile file){
        Integer userId = ((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        Integer id = null;
        try {
            id = fileService.saveImage(file, userId);
        } catch (IOException e) {
            throw new ApiException(ErrorMessage.INVALID_FILE);
        }
        return userService.setAvatar(userId, "https://kuroneko-it.me/api/images/pub/" + id);
    }
}
