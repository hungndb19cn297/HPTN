package com.example.authentication.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UseInfoDto extends UserBaseDto{
    private String avatar;
    private boolean isAdmin;
    private Integer id;
}
