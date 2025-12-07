package com.docugen.controller;

import com.docugen.dto.DocumentDataDTO;
import com.docugen.entity.User;
import com.docugen.repository.UserRepository;
import com.docugen.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final UserRepository userRepository;

    @PostMapping("/generate")
    public ResponseEntity<String> generateDocument(@RequestBody DocumentDataDTO dto) {
        try {
            // Get currently authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            documentService.createAndSend(dto, user);

            return ResponseEntity.ok("Document generated and emailed successfully to " + dto.getRecipientEmail());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error generating document: " + e.getMessage());
        }
    }
}