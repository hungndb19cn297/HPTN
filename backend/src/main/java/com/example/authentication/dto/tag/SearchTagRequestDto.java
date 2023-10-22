package com.example.authentication.dto.tag;

import com.example.authentication.dto.PagingDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchTagRequestDto extends PagingDto {
    private String name;
}
