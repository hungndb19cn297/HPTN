package com.example.authentication.dto.post;

import com.example.authentication.dto.PagingDto;
import com.example.authentication.entity.Bookmark;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchPostDto extends PagingDto {
    private Integer id;
    private String key;
    private Integer tagId;
    private Boolean isBookmark = false;
    private Integer createdBy;
}
