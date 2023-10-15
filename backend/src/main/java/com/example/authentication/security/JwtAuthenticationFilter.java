package com.example.authentication.security;

import com.example.authentication.exception.ApiException;
import com.example.authentication.model.ErrorMessage;
import com.example.authentication.service.MyUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.Locale;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private MyUserDetailsService customUserDetailsService;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    private final RequestMatcher ignoredPaths = new OrRequestMatcher(
            new AntPathRequestMatcher("/login"),
            new AntPathRequestMatcher("/refresh-token"),
            new AntPathRequestMatcher("/images/pub/**"),
            new AntPathRequestMatcher("/posts/pub/**"),
            new AntPathRequestMatcher("/tags/pub/**"),
            new AntPathRequestMatcher("/comments/pub/**"),
            new AntPathRequestMatcher("/users/pub/**"),
            new AntPathRequestMatcher("/api-docs/**"),
            new AntPathRequestMatcher("/swagger-ui/**"),
            new AntPathRequestMatcher("/signup")
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String lang = request.getHeader("Accept-Language");
        lang = lang == null ? "vi" : lang;
        Locale locale = new Locale(lang);
        LocaleContextHolder.setLocale(locale);

        if (this.ignoredPaths.matches(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            String jwt = getJwtFromRequest(request);

            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                Integer userId = tokenProvider.getUserIdFromJWT(jwt);
                MyUserDetail userDetails = customUserDetailsService.loadUserById(userId);
                if (userDetails != null) {
                    UsernamePasswordAuthenticationToken
                            authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                filterChain.doFilter(request, response);
            } else {
                resolver.resolveException(request, response, null, new ApiException(ErrorMessage.INVALID_TOKEN));
            }
        } catch (Exception ex) {
            resolver.resolveException(request, response, null, new ApiException(ErrorMessage.INVALID_TOKEN));
        }
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null)
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access-token"))
                    return cookie.getValue();
            }

        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken)) {
            if (bearerToken.startsWith("Bearer "))
                return bearerToken.substring(7);
            else return bearerToken;
        }
        return null;
    }
}
