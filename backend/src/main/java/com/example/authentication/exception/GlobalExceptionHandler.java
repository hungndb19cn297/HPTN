package com.example.authentication.exception;

import com.example.authentication.model.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@ControllerAdvice
public class GlobalExceptionHandler {
    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleUnwantedException(Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(ErrorMessage.UNKNOWN_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<InputExceptionResponse>> handleInputException(MethodArgumentNotValidException e) {
        List<InputExceptionResponse> erorrs = new ArrayList<>();
        Locale locale = LocaleContextHolder.getLocale();
        for (ObjectError err : e.getAllErrors()) {
            FieldError error = (FieldError) err;
            if (error != null && error.getDefaultMessage() != null)
                try {
                    erorrs.add(new InputExceptionResponse(error.getField(),
                            messageSource.getMessage(error.getDefaultMessage(), null, locale),
                            error.getRejectedValue()));
                } catch (NoSuchMessageException ex) {
                    erorrs.add(new InputExceptionResponse(error.getField(),
                            error.getDefaultMessage(),
                            error.getRejectedValue()));
                }
        }
        return new ResponseEntity<>(erorrs, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<InputExceptionResponse> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e) {
        Locale locale = LocaleContextHolder.getLocale();
        InputExceptionResponse response = InputExceptionResponse.builder()
                .field("File")
                .message(messageSource.getMessage(ErrorMessage.MAX_FILE, null, locale))
                .data(null)
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiExceptionResponse> handleInputException(ApiException e) {
        Locale locale = LocaleContextHolder.getLocale();
        ApiExceptionResponse exceptionResponse = ApiExceptionResponse
                .builder()
                .error(messageSource.getMessage(e.getError(), null, locale))
                .data(e.getData()).build();
        if (e.getError().equals(ErrorMessage.INVALID_TOKEN))
            return new ResponseEntity<>(exceptionResponse, HttpStatus.UNAUTHORIZED);
        if (e.getError().equals(ErrorMessage.PERMISSION_DENIED))
            return new ResponseEntity<>(exceptionResponse, HttpStatus.FORBIDDEN);
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}


