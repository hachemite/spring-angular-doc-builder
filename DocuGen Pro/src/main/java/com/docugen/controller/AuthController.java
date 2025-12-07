package com.docugen.controller;

import com.docugen.dto.AuthResponse;
import com.docugen.dto.LoginRequest;
import com.docugen.dto.RegisterRequest;
import com.docugen.entity.User;
import com.docugen.model.Role;
import com.docugen.repository.UserRepository;
import com.docugen.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().build();
        }

        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER) // Default role
                .build();

        userRepository.save(user);

        // Generate token immediately upon registration
        // We need to load UserDetails for the token generation
        var userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                java.util.Collections.emptyList()
        );

        var jwtToken = jwtService.generateToken(userDetails);
        return ResponseEntity.ok(AuthResponse.builder().token(jwtToken).build());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // If we get here, authentication was successful
        // Load UserDetails to generate token
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                java.util.Collections.emptyList()
        );

        var jwtToken = jwtService.generateToken(userDetails);
        return ResponseEntity.ok(AuthResponse.builder().token(jwtToken).build());
    }
}