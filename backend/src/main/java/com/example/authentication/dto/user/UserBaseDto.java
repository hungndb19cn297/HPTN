package com.example.authentication.dto.user;

import com.example.authentication.model.ErrorMessage;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserBaseDto {
    @NotBlank(message = ErrorMessage.NOT_BLANK)
    @Length(min = 1, max = 255)
    private String firstName;
    @NotBlank(message = ErrorMessage.NOT_BLANK)
    @Length(min = 1, max = 255)
    private String lastName;
    @NotBlank(message = ErrorMessage.NOT_BLANK)
    @Email(message = ErrorMessage.INVALID_EMAIL)
    private String email;
}
