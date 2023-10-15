package com.example.authentication.dto.post;

import com.example.authentication.dto.PagingDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostResponseDtoPage extends PagingDto {
    List<PostResponseDto> posts;
    Long totalElement;
}
