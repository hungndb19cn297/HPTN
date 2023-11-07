package com.example.authentication.dto.user;

import com.example.authentication.model.ErrorMessage;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UserUpdatePasswordDto {
    @NotBlank(message = ErrorMessage.NOT_BLANK)
    @Length(min = 8, max = 20, message = ErrorMessage.INVALID_LENGTH)
    private String oldPassword;

    @NotBlank(message = ErrorMessage.NOT_BLANK)
    @Length(min = 8, max = 20, message = ErrorMessage.INVALID_LENGTH)
    private String newPassword;
}
