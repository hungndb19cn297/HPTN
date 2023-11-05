package com.example.authentication.service;

import com.example.authentication.dto.user.*;
import com.example.authentication.entity.User;
import com.example.authentication.exception.ApiException;
import com.example.authentication.model.ErrorMessage;
import com.example.authentication.repository.UserRepository;
import com.example.authentication.security.JwtTokenProvider;
import com.example.authentication.utils.ConvertUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService extends BaseService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponseDto login(UserLoginDto dto, HttpServletResponse response) {
        User user = userRepository.findOneByEmail(dto.getEmail());
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
        } catch (LockedException ex) {
            throw new ApiException(ErrorMessage.ACCOUNT_LOCK, dto.getEmail());
        } catch (BadCredentialsException e) {
            throw new ApiException(ErrorMessage.USER_NOT_FOUND, dto.getEmail());
        }

        TokenResponse tokenResponse = setCookieToken(user, response);
        UserResponseDto responseDto = ConvertUtils.convert(user, UserResponseDto.class);
        responseDto.setAccessToken(tokenResponse.getAccessToken());
        responseDto.setRefreshToken(tokenResponse.getRefreshToken());
        return responseDto;
    }

    @Transactional
    public Boolean signup(UserSignUpDto dto) {
        User user = userRepository.findOneByEmail(dto.getEmail());
        if (user != null)
            throw new ApiException(ErrorMessage.USER_EXISTED, dto.getEmail());
        user = ConvertUtils.convert(dto, User.class);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setIsAdmin(false);
        user.setIsLocked(false);
        user.setAvatar("logo.jpg");
        userRepository.save(user);
        return true;
    }

    public TokenResponse refreshToken(HttpServletRequest request, HttpServletResponse response) {
        Integer userId = getUserIdFromRefreshToken(request);
        User user = userRepository.findOneById(userId);
        if (user == null)
            throw new ApiException(ErrorMessage.INVALID_TOKEN);
        return setCookieToken(user, response);
    }

    private Integer getUserIdFromRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null)
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh-token"))
                    try {
                        return jwtTokenProvider.getUserIdFromJWT(cookie.getValue());
                    } catch (Exception e) {
                        throw new ApiException(ErrorMessage.INVALID_TOKEN);
                    }
            }
        throw new ApiException(ErrorMessage.INVALID_TOKEN);
    }

    private TokenResponse setCookieToken(User user, HttpServletResponse response) {
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);
        Cookie cookie = new Cookie("refresh-token", refreshToken);
        cookie.setMaxAge(60 * 60 * 24 * 30 * 100);
        cookie.setHttpOnly(true);
        cookie.setPath("/api/refresh-token");
        response.addCookie(cookie);

        String accessToken = jwtTokenProvider.generateAccessToken(user);
        Cookie cookie2 = new Cookie("access-token", accessToken);
        cookie2.setMaxAge(60 * 60 * 24 * 30 * 100);
        cookie2.setHttpOnly(true);
        response.addCookie(cookie2);

        return TokenResponse.builder().refreshToken(refreshToken).accessToken(accessToken).build();
    }

    public Boolean logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = new Cookie("refresh-token", "");
        cookie.setMaxAge(0);
        cookie.setPath("/api/refresh-token");
        response.addCookie(cookie);
        Cookie cookie2 = new Cookie("access-token", "");
        cookie2.setMaxAge(0);
        response.addCookie(cookie2);
        return true;
    }
}
