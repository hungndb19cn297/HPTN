package com.example.authentication.service;

import com.example.authentication.dto.post.PostResponseDtoPage;
import com.example.authentication.dto.post.SearchPostDto;
import com.example.authentication.dto.tag.SearchTagRequestDto;
import com.example.authentication.dto.tag.TagDto;
import com.example.authentication.dto.tag.TagResponseDto;
import com.example.authentication.entity.Tag;
import com.example.authentication.utils.ConvertUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TagService extends BaseService {

    public TagResponseDto searchTag(SearchTagRequestDto requestDto) {
        requestDto.validatePage();
        requestDto.setPageSize(1000);
        Page<Tag> tagPage = tagRepository.searchTag(
                requestDto.getName(),
                PageRequest.of(requestDto.getPageIndex()-1, requestDto.getPageSize()));
        TagResponseDto responseDto = new TagResponseDto();
        responseDto.setTags(ConvertUtils.convertList(tagPage.toList(), TagDto.class));
        responseDto.setTotalElement(tagPage.getTotalElements());
        responseDto.setPageIndex(requestDto.getPageIndex());
        responseDto.setPageSize(requestDto.getPageSize());
        return responseDto;
    }
}
