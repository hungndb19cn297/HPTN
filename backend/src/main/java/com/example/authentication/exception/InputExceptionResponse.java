package com.example.authentication.exception;

import lombok.*;

import java.util.Objects;

@Data
@AllArgsConstructor
@Builder
@Getter
public class InputExceptionResponse {
    private String field;
    private String message;
    private Object data;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof InputExceptionResponse that)) return false;
        try {
            Double dataNumber = Double.parseDouble(String.valueOf(data));
            Double thatDataNumber = Double.parseDouble(String.valueOf(that.data));
            return Objects.equals(field, that.field) && Objects.equals(message, that.message) && Objects.equals(dataNumber, thatDataNumber);
        } catch (NumberFormatException ex) {
            return Objects.equals(field, that.field) && Objects.equals(message, that.message) && Objects.equals(data, that.data);
        }
    }

}
