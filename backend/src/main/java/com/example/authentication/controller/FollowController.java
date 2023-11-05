package com.example.authentication.controller;

import com.example.authentication.security.MyUserDetail;
import com.example.authentication.service.FollowService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("follows")
@CrossOrigin(origins = "*")
@Slf4j
public class FollowController {
    @Autowired
    private FollowService followService;

    @PostMapping
    public Integer followOrUnFollowUser(@RequestParam Integer toId){
        Integer fromId =((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        return followService.followOrUnFollowUser(fromId, toId);
    }

    @GetMapping
    public Boolean isFollow(@RequestParam Integer toId){
        Integer fromId =((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        return followService.isFollow(fromId, toId);
    }
}
