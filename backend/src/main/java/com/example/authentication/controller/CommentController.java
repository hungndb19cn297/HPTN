package com.example.authentication.controller;

import com.example.authentication.dto.comment.CommentRequestDto;
import com.example.authentication.dto.comment.CommentResponseDto;
import com.example.authentication.security.MyUserDetail;
import com.example.authentication.service.CommentService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("comments")
@CrossOrigin(origins = "*")
@Slf4j
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping
    public CommentResponseDto createComment(@RequestBody @Valid CommentRequestDto requestDto){
        Integer userId =((MyUserDetail) SecurityContextHolder
                    .getContext().getAuthentication().getPrincipal()).getId();
        return commentService.createComment(requestDto, userId);
    }

    @GetMapping("pub")
    public List<CommentResponseDto> getComment(Integer postId){
        return commentService.getComment(postId);
    }

    @DeleteMapping
    public Boolean deleteComment(@RequestParam Integer id){
        Integer userId =((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        return commentService.deleteComment(userId, id);
    }
}
