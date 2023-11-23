package com.example.authentication.dto.report;

import com.example.authentication.dto.user.UseInfoDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportUserInteractDto {
    private int bookmarksCount = 0;
    private int commentCount = 0;
    private int voteCount = 0;
    private int followCount = 0;
    private UseInfoDto user;
    private int totalInteract = 0;

    public ReportUserInteractDto(UseInfoDto user) {
        this.user = user;
    }
}
