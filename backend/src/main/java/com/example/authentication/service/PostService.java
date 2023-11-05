package com.example.authentication.service;

import com.example.authentication.dto.tag.TagDto;
import com.example.authentication.dto.post.*;
import com.example.authentication.dto.user.UseInfoDto;
import com.example.authentication.entity.Post;
import com.example.authentication.entity.PostTag;
import com.example.authentication.exception.ApiException;
import com.example.authentication.model.ErrorMessage;
import com.example.authentication.utils.ConvertUtils;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class PostService extends BaseService {

    @Transactional
    public Integer createPost(CreatePostDto requestDto, Integer userId) {
        List<Integer> tags = tagRepository.getIdExisted(requestDto.getTagIds());
        if (tags.size() != requestDto.getTagIds().size())
            throw new ApiException(ErrorMessage.INVALID_TAG_ID);
        var post = ConvertUtils.convert(requestDto, Post.class);
        post.setCreatedBy(userId);
        post.setUpdatedBy(userId);
        post.setPostTags(requestDto.getTagIds().stream().map(tagId -> new PostTag(tagId, post)).toList());
        postRepository.saveAndFlush(post);
        return post.getId();
    }

    public Integer updatePost(UpdatePostDto requestDto, Integer userId) {
        Post post = postRepository.findById(requestDto.getId()).orElse(null);
        if (post == null)
            throw new ApiException(ErrorMessage.INVALID_ID);
//        if (!Objects.equals(post.getCreatedBy(), userId))
//            throw new ApiException(ErrorMessage.PERMISSION_DENIED);
        List<Integer> tags = tagRepository.getIdExisted(requestDto.getTagIds());
        if (tags.size() != requestDto.getTagIds().size())
            throw new ApiException(ErrorMessage.INVALID_TAG_ID);
        post.setTitle(requestDto.getTitle());
        post.setContent(requestDto.getContent());
        post.getPostTags().clear();
//        post.setUpdatedBy(userId);
        postRepository.save(post);
        postTagRepository.saveAll(requestDto.getTagIds().stream().map(tagId -> new PostTag(tagId, post)).toList());
        return post.getId();
    }

    public PostResponseDtoPage searchPost(SearchPostDto requestDto, Integer userId) {
        requestDto.validatePage();
        if (requestDto.getIsBookmark() && userId == null)
            throw new ApiException(ErrorMessage.PERMISSION_DENIED);
        Page<Post> postPage = postRepository.searchPost(requestDto.getId(),
                requestDto.getKey(),
                requestDto.getTagId() == null || requestDto.getTagId().isEmpty() ? new ArrayList<>(List.of(-1)) : requestDto.getTagId(),
                requestDto.getIsBookmark(),
                requestDto.getCreatedBy(),
                userId,
                PageRequest.of(requestDto.getPageIndex() - 1, requestDto.getPageSize(), Sort.by("createdAt").descending()));

        List<PostResponseDto> postDtos = postPage.toList().stream().map(dto -> {
            PostResponseDto postDto = ConvertUtils.convert(dto, PostResponseDto.class);
            postDto.setTags(ConvertUtils.convertList(dto.getPostTags().stream().map(PostTag::getTag).toList(), TagDto.class));
            postDto.setCreatedBy(ConvertUtils.convert(userRepository.findOneById(dto.getCreatedBy()),UseInfoDto.class));
            postDto.setCommentCount(commentRepository.countByPostId(dto.getId()));
            postDto.setBookmarksCount(bookmarkRepository.countByPostId(dto.getId()));
            postDto.setVoteCount(voteRepository.getTotalVote(dto.getId()));
            return postDto;
        }).toList();

        PostResponseDtoPage response = new PostResponseDtoPage();
        response.setPosts(postDtos);
        response.setTotalElement(postPage.getTotalElements());
        response.setPageIndex(requestDto.getPageIndex());
        response.setPageSize(requestDto.getPageSize());
        return response;
    }
}
