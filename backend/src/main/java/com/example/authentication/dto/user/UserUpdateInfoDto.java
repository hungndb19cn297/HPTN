package com.example.authentication.dto.user;

import com.example.authentication.model.ErrorMessage;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class UserUpdateInfoDto {
    @NotBlank(message = ErrorMessage.NOT_BLANK)
    @Length(min = 4, max = 255, message = ErrorMessage.INVALID_LENGTH)
    private String firstName;
    @NotBlank(message = ErrorMessage.NOT_BLANK)
    @Length(min = 4, max = 255, message = ErrorMessage.INVALID_LENGTH)
    private String lastName;
}
