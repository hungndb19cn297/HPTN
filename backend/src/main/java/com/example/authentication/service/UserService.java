package com.example.authentication.service;

import com.example.authentication.dto.user.UserDataDto;
import com.example.authentication.dto.vote.VoteRequestDto;
import com.example.authentication.dto.vote.VoteResponseDto;
import com.example.authentication.entity.User;
import com.example.authentication.entity.Vote;
import com.example.authentication.exception.ApiException;
import com.example.authentication.model.ErrorMessage;
import com.example.authentication.utils.ConvertUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
public class UserService extends BaseService {
    public UserDataDto getUserData(Integer userId){
        User user = userRepository.findOneById(userId);
        if (user == null)
            throw new ApiException(ErrorMessage.USER_NOT_FOUND);
        UserDataDto responseDto = ConvertUtils.convert(user, UserDataDto.class);
        responseDto.setTotalComments(commentRepository.countByCreatedBy(userId));
        responseDto.setTotalFollowers(followRepository.countByToUserId(userId));
        responseDto.setTotalPosts(postRepository.countByCreatedBy(userId));
        return responseDto;
    }
}
