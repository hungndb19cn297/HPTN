package com.example.authentication.dto.post;

import com.example.authentication.dto.TagDto;
import com.example.authentication.dto.user.UseInfoDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostResponseDto {
    private Integer id;
    private String title;
    private String content;
    private List<TagDto> tags;
    private Integer bookmarksCount;
    private Integer commentCount;
    private Integer voteCount;
    private UseInfoDto createdBy;
}
