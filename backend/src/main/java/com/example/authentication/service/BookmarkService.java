package com.example.authentication.service;

import com.example.authentication.dto.bookmark.BookmarkDto;
import com.example.authentication.dto.comment.CommentRequestDto;
import com.example.authentication.dto.comment.CommentResponseDto;
import com.example.authentication.dto.user.UseInfoDto;
import com.example.authentication.entity.Bookmark;
import com.example.authentication.entity.Comment;
import com.example.authentication.entity.Post;
import com.example.authentication.entity.User;
import com.example.authentication.exception.ApiException;
import com.example.authentication.model.ErrorMessage;
import com.example.authentication.utils.ConvertUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class BookmarkService extends BaseService {

    public Boolean checkUserBookmark(Integer userId, Integer postId) {
        return bookmarkRepository.existsByUserIdAndPostId(userId, postId);
    }

    public BookmarkDto bookmarkOrUnBookmarkPost(Integer userId, Integer postId) {
        if (!postRepository.existsById(postId))
            throw new ApiException(ErrorMessage.INVALID_POST);
        Bookmark bookmark = bookmarkRepository.findOneByUserIdAndPostId(userId, postId);
        if (bookmark != null) {
            bookmarkRepository.delete(bookmark);
            return BookmarkDto.builder().isBookmark(false).totalBookmark(bookmarkRepository.countByPostId(postId)).build();
        }
        bookmark = new Bookmark();
        bookmark.setPost(Post.builder().id(postId).build());
        bookmark.setUser(User.builder().id(userId).build());
        bookmarkRepository.saveAndFlush(bookmark);
        return BookmarkDto.builder().isBookmark(true).totalBookmark(bookmarkRepository.countByPostId(postId)).build();
    }
}
