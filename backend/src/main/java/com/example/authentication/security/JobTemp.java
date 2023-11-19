package com.example.authentication.security;

import com.example.authentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class JobTemp {
    @Autowired
    private UserRepository userRepository;
    @Scheduled(fixedRate = 1000*60)
    public void scheduleTaskWithFixedRate() {
        userRepository.existsById(0);
    }
}
