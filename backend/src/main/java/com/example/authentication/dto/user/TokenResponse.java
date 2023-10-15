package com.example.authentication.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TokenResponse {
    private String refreshToken;
    private String accessToken;
}
