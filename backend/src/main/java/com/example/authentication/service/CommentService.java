package com.example.authentication.service;

import com.example.authentication.dto.comment.CommentRequestDto;
import com.example.authentication.dto.comment.CommentResponseDto;
import com.example.authentication.dto.user.UseInfoDto;
import com.example.authentication.entity.Comment;
import com.example.authentication.entity.Post;
import com.example.authentication.exception.ApiException;
import com.example.authentication.model.ErrorMessage;
import com.example.authentication.utils.ConvertUtils;
import com.example.authentication.utils.DateTimeUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class CommentService extends BaseService {

    public CommentResponseDto createComment(CommentRequestDto requestDto, Integer userId) {
        Post post = postRepository.findById(requestDto.getPostId()).orElse(null);
        if (post == null)
            throw new ApiException(ErrorMessage.INVALID_POST);
        if (requestDto.getParentId() != null) {
            Comment c = commentRepository.findById(requestDto.getParentId()).orElse(null);
            if (c == null || !c.getPost().getId().equals(post.getId()))
                throw new ApiException(ErrorMessage.INVALID_COMMENT);
            if (c.getParentId() != null)
                requestDto.setParentId(c.getParentId());
        }
        Comment comment = ConvertUtils.convert(requestDto, Comment.class);
        comment.setPost(post);
        comment.setCreatedBy(userId);
        commentRepository.save(comment);
        CommentResponseDto responseDto = ConvertUtils.convert(comment, CommentResponseDto.class);
        responseDto.setCreatedBy(ConvertUtils.convert(userRepository.findOneById(userId), UseInfoDto.class));
        return responseDto;
    }


    public List<CommentResponseDto> getComment(Integer postId) {
        if (!postRepository.existsById(postId))
            throw new ApiException(ErrorMessage.INVALID_POST);
        List<Comment> comments = commentRepository.findAllByPostIdOrderById(postId);
        if (comments == null || comments.size() == 0)
            return new ArrayList<>();

        Map<Integer, CommentResponseDto> responseDtoMap = new TreeMap<>();
        for (Comment comment : comments) {
            CommentResponseDto tempC = new CommentResponseDto();
            if (comment.getDeletedAt() == null) {
                tempC = ConvertUtils.convert(comment, CommentResponseDto.class);
                tempC.setChildrenComment(new ArrayList<>());
                tempC.setCreatedBy(ConvertUtils.convert(userRepository.findOneById(comment.getCreatedBy()), UseInfoDto.class));
            } else {
                tempC = ConvertUtils.convert(comment, CommentResponseDto.class);
                tempC.setCreatedBy(ConvertUtils.convert(userRepository.findOneById(comment.getCreatedBy()), UseInfoDto.class));
                tempC.setChildrenComment(new ArrayList<>());
                tempC.setDeletedAt(comment.getDeletedAt());
                tempC.setContent("Bình luận này đã bị xoá lúc " + DateTimeUtils.dateToString(comment.getDeletedAt(), DateTimeUtils.FORMAT_DATE_TIME5));
            }

            if (comment.getParentId() != null && responseDtoMap.get(comment.getParentId()) != null) {
                if (responseDtoMap.get(comment.getParentId()).getDeletedAt() == null) {
                    responseDtoMap.get(comment.getParentId()).getChildrenComment().add(tempC);
                }
            } else {
                responseDtoMap.put(comment.getId(), tempC);
            }
        }

        List<CommentResponseDto> responseDtos = new ArrayList<>(responseDtoMap.values());
        Collections.reverse(responseDtos);
        return responseDtos;
    }

    @Transactional
    public Boolean deleteComment(Integer userId, Integer commentId){
        Comment comment = commentRepository.findOneByCreatedByAndId(userId, commentId);
        if (comment == null)
            throw new ApiException(ErrorMessage.INVALID_COMMENT);
        comment.setDeletedAt(new Date());
        commentRepository.deleteAllByParentId(commentId);
        commentRepository.save(comment);
        return true;
    }
}
