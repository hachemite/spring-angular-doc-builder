package com.docugen.config;

import com.docugen.entity.User;
import com.docugen.model.Role;
import com.docugen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail("admin@docugen.com")) {
            User admin = User.builder()
                    .fullName("System Administrator")
                    .email("admin@docugen.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.ADMIN)
                    .build();

            userRepository.save(admin);
            System.out.println("✅ ADMIN USER SEEDED: admin@docugen.com / password123");
        } else {
            System.out.println("ℹ️ Admin user already exists.");
        }
    }
}