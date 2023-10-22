package com.example.authentication.dto.comment;

import com.example.authentication.dto.user.UseInfoDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDto {
    private Integer id;
    private String content;
    private List<CommentResponseDto> childrenComment;
    private Integer postId;
    private UseInfoDto createdBy;
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Jakarta")
    private Date createdAt;
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Jakarta")
    private Date deleteAt;
}
