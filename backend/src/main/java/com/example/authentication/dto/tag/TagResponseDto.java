package com.example.authentication.dto.tag;

import com.example.authentication.dto.PagingDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class TagResponseDto extends PagingDto {
    private List<TagDto> tags;
    private Long totalElement;
}
