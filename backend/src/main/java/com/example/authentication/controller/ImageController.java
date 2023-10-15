package com.example.authentication.controller;

import com.example.authentication.exception.ApiException;
import com.example.authentication.model.ErrorMessage;
import com.example.authentication.security.MyUserDetail;
import com.example.authentication.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.IOException;

@RestController
@RequestMapping("images")
@CrossOrigin(origins = "*")
@Slf4j
public class ImageController {
    @Autowired
    private FileService fileService;

    @PostMapping
    public String uploadImage(@RequestParam MultipartFile file, Authentication authentication){
        Integer userId = ((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        Integer id = null;
        try {
            id = fileService.saveImage(file, userId);
        } catch (IOException e) {
            throw new ApiException(ErrorMessage.INVALID_FILE);
        }
        return "http://localhost:8080/api/images/load/" + id;
    }

    @GetMapping("/pub/{id}")
    public Mono<Resource> streamFileByWords(@PathVariable Integer id) throws IOException {
        return fileService.streamFile(id);
    }
}
