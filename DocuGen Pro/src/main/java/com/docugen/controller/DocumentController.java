package com.docugen.controller;

import com.docugen.dto.DocumentDataDTO;
import com.docugen.entity.User;
import com.docugen.repository.UserRepository;
import com.docugen.service.DocumentService;
import com.docugen.service.DynamicPdfService;
import com.docugen.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final UserRepository userRepository;
    private final DynamicPdfService dynamicPdfService;
    private final EmailService emailService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateDocument(@RequestBody DocumentDataDTO dto) {
        try {
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

    @PostMapping("/generate-dynamic")
    public ResponseEntity<String> generateDynamicDocument(@RequestBody Map<String, Object> payload) {
        try {
            System.out.println("=== RECEIVED PAYLOAD ===");
            System.out.println(payload);

            // Check if templateId exists in payload
            if (!payload.containsKey("templateId")) {
                System.err.println("ERROR: templateId is missing from payload");
                System.err.println("Available keys: " + payload.keySet());
                return ResponseEntity.badRequest().body("templateId is required");
            }

            // Extract recipientEmail
            String recipientEmail = (String) payload.get("recipientEmail");
            if (recipientEmail == null || recipientEmail.isEmpty()) {
                return ResponseEntity.badRequest().body("recipientEmail is required");
            }

            // Extract and convert templateId
            Object templateIdObj = payload.get("templateId");
            Long templateId;

            if (templateIdObj instanceof Integer) {
                templateId = ((Integer) templateIdObj).longValue();
            } else if (templateIdObj instanceof Long) {
                templateId = (Long) templateIdObj;
            } else if (templateIdObj instanceof String) {
                templateId = Long.parseLong((String) templateIdObj);
            } else {
                System.err.println("ERROR: templateId has unexpected type: " + templateIdObj.getClass().getName());
                return ResponseEntity.badRequest().body("templateId must be a number");
            }

            System.out.println("Processing template ID: " + templateId);
            System.out.println("Recipient email: " + recipientEmail);

            // Remove templateId and recipientEmail from payload so they don't get passed to Thymeleaf
            Map<String, Object> templateData = new java.util.HashMap<>(payload);
            templateData.remove("templateId");
            templateData.remove("recipientEmail");

            System.out.println("Template data for processing: " + templateData);

            // Generate PDF
            byte[] pdfBytes = dynamicPdfService.generatePdf(templateId, templateData);

            System.out.println("✅ PDF Generated successfully! Size: " + pdfBytes.length + " bytes");

            // Send Email
            try {
                String subject = "Your Generated Document";
                String body = "Hello,\n\nPlease find your generated document attached.\n\nBest regards,\nDocuGen Pro Team";
                String filename = "document_" + System.currentTimeMillis() + ".pdf";

                emailService.sendEmailWithAttachment(
                        recipientEmail,
                        subject,
                        body,
                        pdfBytes,
                        filename
                );

                System.out.println("📧 Email sent successfully to: " + recipientEmail);
                return ResponseEntity.ok("Document generated and sent to " + recipientEmail);

            } catch (Exception emailError) {
                System.err.println("⚠️ Email sending failed: " + emailError.getMessage());
                emailError.printStackTrace();

                // Still return success for PDF generation
                return ResponseEntity.ok("Document generated successfully! (Email failed: " + emailError.getMessage() + ")");
            }

        } catch (NumberFormatException e) {
            System.err.println("ERROR: Invalid templateId format");
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid templateId format");
        } catch (Exception e) {
            System.err.println("ERROR: Failed to generate document");
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}