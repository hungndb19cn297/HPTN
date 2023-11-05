package com.example.authentication.service;

import com.example.authentication.dto.comment.CommentRequestDto;
import com.example.authentication.dto.comment.CommentResponseDto;
import com.example.authentication.dto.user.UseInfoDto;
import com.example.authentication.dto.vote.VoteRequestDto;
import com.example.authentication.dto.vote.VoteResponseDto;
import com.example.authentication.entity.Comment;
import com.example.authentication.entity.Post;
import com.example.authentication.entity.Vote;
import com.example.authentication.exception.ApiException;
import com.example.authentication.model.ErrorMessage;
import com.example.authentication.utils.ConvertUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class VoteService extends BaseService {
    @Transactional
    public VoteResponseDto votePost(Integer userId, VoteRequestDto requestDto){
        if (requestDto.getVote() < -1)
            requestDto.setVote(-1);
        if (requestDto.getVote() > 1)
            requestDto.setVote(1);
        if (!postRepository.existsById(requestDto.getPostId()))
            throw new ApiException(ErrorMessage.INVALID_POST);
        Vote vote = voteRepository.findOneByPostIdAndUserId(requestDto.getPostId(), userId);
        if (vote == null)
            vote = Vote.builder().postId(requestDto.getPostId()).userId(userId).vote(0).build();
        vote.setVote(Objects.equals(requestDto.getVote(), vote.getVote()) ? 0 : requestDto.getVote());
        voteRepository.saveAndFlush(vote);
        VoteResponseDto responseDto = ConvertUtils.convert(vote, VoteResponseDto.class);
        responseDto.setTotalVote(voteRepository.getTotalVote(responseDto.getPostId()));
        return responseDto;
    }

    public Integer getMyVote(Integer userId, Integer postId) {
        Vote vote = voteRepository.findOneByPostIdAndUserId(postId, userId);
        return vote == null ? 0 : vote.getVote();
    }
}
