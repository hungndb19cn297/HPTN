package com.example.authentication.dto.vote;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteResponseDto extends VoteRequestDto{
    public Integer totalVote;
}
