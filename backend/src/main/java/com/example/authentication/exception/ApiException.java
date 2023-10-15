package com.example.authentication.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiException extends RuntimeException {
    private String error;
    private Object data;

    public ApiException(String error, Object data, Throwable cause) {
        super(error, cause);
        this.error = error;
        this.data = data;
    }

    public ApiException(String error) {
        super(error, null);
        this.error = error;
    }

    public ApiException(String error, Object data) {
        super(error, null);
        this.error = error;
        this.data = data;
    }
}
