package com.example.authentication.dto.post;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class CreatePostDto {
    @Length(max = 255)
    @NotBlank
    private String title;
    @Length(max = 20000)
    @NotBlank
    private String content;
    private Set<Integer> tagIds;
}

