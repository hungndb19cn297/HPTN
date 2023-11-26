package com.example.authentication.controller;

import com.example.authentication.dto.tag.SearchTagRequestDto;
import com.example.authentication.dto.tag.TagResponseDto;
import com.example.authentication.security.MyUserDetail;
import com.example.authentication.service.TagService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("tags")
@CrossOrigin(origins = "*")
@Slf4j
public class TagController {
    @Autowired
    private TagService tagService;
    @PostMapping("pub/search")
    public TagResponseDto searchTag(@RequestBody SearchTagRequestDto requestDto){
        return tagService.searchTag(requestDto);
    }

    @PostMapping
    public Integer addNewTag(@RequestParam String tag){
        Integer userId =((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        return tagService.createTag(tag, userId);
    }
    @DeleteMapping
    public Integer delete(@RequestParam Integer tag){
        Integer userId =((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        return tagService.deleteTag(tag, userId);
    }
}
