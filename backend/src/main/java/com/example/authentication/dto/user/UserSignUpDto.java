package com.example.authentication.dto.user;

import com.example.authentication.model.ErrorMessage;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@Data
public class UserSignUpDto extends UserBaseDto {
    @NotBlank(message = ErrorMessage.NOT_BLANK)
    @Length(min = 8, max = 20, message = ErrorMessage.INVALID_LENGTH)
    private String password;
}
