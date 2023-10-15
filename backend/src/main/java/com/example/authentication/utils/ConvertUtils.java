package com.example.authentication.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;
import com.google.gson.reflect.TypeToken;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ConvertUtils {
    private static Gson gson = new GsonBuilder().registerTypeAdapter(Date.class, new GsonUTCDateAdapter()).create();

    public static <T> T convert(Object source, Class<T> dstClass) {
        if (source == null)
            return null;
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);
        return modelMapper.map(source, dstClass);
    }

    public static <T> T jsonToObject(String jsonValue, Class<T> dstClass) {
        if (jsonValue == null || jsonValue.trim().isEmpty())
            return null;
        try {
            return gson.fromJson(jsonValue, dstClass);
        } catch (Exception e) {
            throw new JsonParseException("INVALID_JSON_PARSE");
        }
    }

    public static <T> List<T> convertList(List<?> sourceList, Class<T> dstClass) {
        if (sourceList == null) {
            return null;
        }

        List<T> outList = new ArrayList<>();
        for (Object object : sourceList) {
            outList.add(convert(object, dstClass));
        }

        return outList;
    }

    public static <T> List<T> convertList(String jsonString, Class<T> dstClass) {
        List<T> sourceList = new Gson().fromJson(jsonString, new TypeToken<T>() {
        }.getType());

        List<T> outList = new ArrayList<>();
        for (Object object : sourceList) {
            outList.add(convert(object, dstClass));
        }

        return outList;
    }

    public static <T> T convertWithDateFormat(Object source, Class<T> dstClass, String dateFormat) {
        if (source == null)
            return null;

        Converter<Date, String> dateToStringConverter = new Converter<Date, String>() {
            @Override
            public String convert(MappingContext<Date, String> context) {
                return DateTimeUtils.dateToString(context.getSource(), dateFormat);
            }
        };

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);
        modelMapper.addConverter(dateToStringConverter);

        return modelMapper.map(source, dstClass);
    }

    public static <T> List<T> convertListWithDateFormat(List<?> sourceList, Class<T> dstClass, String dateFormat) {
        if (sourceList == null) {
            return null;
        }

        List<T> outList = new ArrayList<>();
        for (Object object : sourceList) {
            outList.add(convertWithDateFormat(object, dstClass, dateFormat));
        }

        return outList;
    }
}
