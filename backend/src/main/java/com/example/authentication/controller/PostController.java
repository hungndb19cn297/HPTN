package com.example.authentication.controller;

import com.example.authentication.dto.post.CreatePostDto;
import com.example.authentication.dto.post.PostResponseDtoPage;
import com.example.authentication.dto.post.SearchPostDto;
import com.example.authentication.dto.post.UpdatePostDto;
import com.example.authentication.entity.Post;
import com.example.authentication.security.MyUserDetail;
import com.example.authentication.service.PostService;
import com.example.authentication.utils.ConvertUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("posts")
@CrossOrigin(origins = "*")
@Slf4j
public class PostController {
    @Autowired
    private PostService postService;
    @PostMapping
    public Integer createPost(Authentication authentication, @RequestBody CreatePostDto requestDto){
        Integer userId = ((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();

        return postService.createPost(requestDto, userId);
    }

    @PutMapping
    public Integer updatePost(Authentication authentication, @RequestBody UpdatePostDto requestDto){
        Integer userId = ((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        return postService.updatePost(requestDto, userId);
    }

    @PostMapping("pub/search")
    public PostResponseDtoPage searchPost(Authentication authentication, @RequestBody SearchPostDto requestDto){
        Integer userId = null;
        try {
            userId =((MyUserDetail) SecurityContextHolder
                    .getContext().getAuthentication().getPrincipal()).getId();
        } catch (Exception ignored) {

        }
        return postService.searchPost(requestDto, userId);
    }
}
