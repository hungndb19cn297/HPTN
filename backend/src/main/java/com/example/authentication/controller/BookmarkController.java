package com.example.authentication.controller;

import com.example.authentication.dto.bookmark.BookmarkDto;
import com.example.authentication.security.MyUserDetail;
import com.example.authentication.service.BookmarkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("bookmarks")
@CrossOrigin(origins = "*")
@Slf4j
public class BookmarkController {
    @Autowired
    private BookmarkService bookmarkService;

    @GetMapping
    public Boolean checkUserBookmark(@RequestParam Integer postId){
        Integer userId =((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        return bookmarkService.checkUserBookmark(userId, postId);
    }

    @PostMapping
    public BookmarkDto bookmarkOrUnBookmarkPost(@RequestParam Integer postId){
        Integer userId =((MyUserDetail) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getId();
        return bookmarkService.bookmarkOrUnBookmarkPost(userId, postId);
    }
}
