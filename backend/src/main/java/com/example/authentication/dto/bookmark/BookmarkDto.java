package com.example.authentication.dto.bookmark;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookmarkDto {
    private Boolean isBookmark;
    private Integer totalBookmark;
}
