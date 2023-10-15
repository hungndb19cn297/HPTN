package com.example.authentication.annotation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.List;

public class EnumValidatorConstraint implements
        ConstraintValidator<EnumValidator, String> {
    private Class<? extends Enum<?>> enumClass;
    @Override
    public void initialize(EnumValidator annotation) {
        ConstraintValidator.super.initialize(annotation);
        this.enumClass = annotation.enumClass();
    }

    @Override
    public boolean isValid(String enumField,
                           ConstraintValidatorContext cxt) {
        List<String> enumNames = Arrays.stream(enumClass.getEnumConstants()).map(Enum::name).toList();
        return enumField == null || enumNames.contains(enumField);
    }

}
