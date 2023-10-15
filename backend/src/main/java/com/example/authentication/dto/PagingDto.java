package com.example.authentication.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagingDto {
    private Integer pageIndex;
    private Integer pageSize;

    public void validatePage() {
        if (pageIndex == null || pageIndex < 0)
            pageIndex = 1;
        if (pageSize == null || pageSize < 0)
            pageSize = 20;
        if (pageSize > 50)
            pageSize = 50;
    }
}
