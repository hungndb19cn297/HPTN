package com.example.authentication.dto.comment;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.Date;

@Getter
@Setter
public class CommentRequestDto {
    @Length(max = 2000, min = 1)
    @NotNull
    private String content;
    private Integer parentId;
    @NotNull
    private Integer postId;
}
