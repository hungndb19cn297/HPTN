package com.example.authentication.dto.user;

import com.example.authentication.model.ErrorMessage;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserBaseDto {
    @NotBlank(message = ErrorMessage.NOT_BLANK)
    private String firstName;
    @NotBlank(message = ErrorMessage.NOT_BLANK)
    private String lastName;
    @NotBlank(message = ErrorMessage.NOT_BLANK)
    private String email;
}
