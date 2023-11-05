package com.example.authentication.controller;

import com.example.authentication.dto.vote.VoteRequestDto;
import com.example.authentication.dto.vote.VoteResponseDto;
import com.example.authentication.security.MyUserDetail;
import com.example.authentication.service.VoteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("votes")
@CrossOrigin(origins = "*")
@Slf4j
public class VoteController {
    @Autowired
    private VoteService voteService;
    @PostMapping
    public VoteResponseDto votePost(@RequestParam Integer vote, @RequestParam Integer postId){
        Integer userId =((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        return voteService.votePost(userId, new VoteRequestDto(vote, postId));
    }

    @GetMapping
    public Integer getMyVote(@RequestParam Integer postId){
        Integer userId =((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        return voteService.getMyVote(userId, postId);
    }
}
