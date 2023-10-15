package com.example.authentication.security;

import com.example.authentication.entity.User;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {
    private final String JWT_SECRET = "secretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecretsecret";

    private final long JWT_REFRESH_EXPIRATION = 60L * 60 * 24 * 30 * 1000;
    private final long JWT_ACCESS_EXPIRATION = 60L * 5 * 1000 * 60 * 24; //TODO: FIX THIS

    public String generateRefreshToken(User userDetails) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_REFRESH_EXPIRATION);
        return Jwts.builder()
                .setSubject(Long.toString(userDetails.getId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();
    }

    public String generateAccessToken(User userDetails) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_ACCESS_EXPIRATION);
        return Jwts.builder()
                .setSubject(Long.toString(userDetails.getId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();
    }

    public Integer getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return Integer.parseInt(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (Exception ignored) {
            ignored.printStackTrace();
        }
        return true;
    }
}
