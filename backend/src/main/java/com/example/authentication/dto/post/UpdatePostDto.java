package com.example.authentication.dto.post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.Set;

@Getter
@Setter
public class UpdatePostDto extends CreatePostDto{
    @NotNull
    private Integer id;
}
