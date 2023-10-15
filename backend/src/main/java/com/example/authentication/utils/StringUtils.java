package com.example.authentication.utils;

import javax.sql.rowset.serial.SerialClob;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;
import java.sql.SQLException;

public class StringUtils {
    private StringUtils() {
    }

    public static String clobToString(Clob clobObject) throws IOException, SQLException {
        final StringBuilder sb = new StringBuilder();

        final Reader reader = clobObject.getCharacterStream();
        final BufferedReader br = new BufferedReader(reader);

        int b;
        while (-1 != (b = br.read())) {
            sb.append((char) b);
        }

        br.close();

        return sb.toString();
    }

    public static Clob stringToClob(String source) throws SQLException {
        return new SerialClob(source.toCharArray());
    }

    public static String removeHtmlParagraphTags(String source) {
        String result;
        try {
            result = source.replaceAll("<\\/?p>", "");
        } catch (Exception e) {
            result = source;
        }
        return result;
    }
}
