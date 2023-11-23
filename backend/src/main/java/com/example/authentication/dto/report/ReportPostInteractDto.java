package com.example.authentication.dto.report;

import com.example.authentication.dto.tag.TagDto;
import com.example.authentication.dto.user.UseInfoDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ReportPostInteractDto {
    private int bookmarksCount = 0;
    private int commentCount = 0;
    private int voteCount = 0;
    private UseInfoDto createdBy;
    private Integer id;
    private String title;
    private List<TagDto> tags;
    private int totalInteract;

    public ReportPostInteractDto(Integer id) {
        this.id = id;
    }
}
