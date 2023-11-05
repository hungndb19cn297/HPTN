package com.example.authentication.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDataDto extends UseInfoDto {
    private Integer totalPosts;
    private Integer totalComments;
    private Integer totalFollowers;
}
