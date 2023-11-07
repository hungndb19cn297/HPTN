package com.example.authentication.service;

import com.example.authentication.dto.comment.CommentRequestDto;
import com.example.authentication.dto.comment.CommentResponseDto;
import com.example.authentication.dto.user.UseInfoDto;
import com.example.authentication.entity.Comment;
import com.example.authentication.entity.Follow;
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
public class FollowService extends BaseService {

    public Integer followOrUnFollowUser(Integer fromId, Integer toId) {
        User fromUser = userRepository.findOneById(fromId);
        User toUser = userRepository.findOneById(toId);
        if (fromUser == null || toUser == null)
            throw new ApiException(ErrorMessage.USER_NOT_FOUND);
        Follow follow = followRepository.findOneByFromUserIdAndToUserId(fromId, toId);
        if (follow != null) {
            followRepository.delete(follow);
            return followRepository.countByToUserId(toId);
        }
        follow = new Follow();
        follow.setFromUser(fromUser);
        follow.setToUser(toUser);
        followRepository.saveAndFlush(follow);
        return followRepository.countByToUserId(toId);
    }

    public Boolean isFollow(Integer fromId, Integer toId) {
        return followRepository.findOneByFromUserIdAndToUserId(fromId, toId) != null;
    }
}
