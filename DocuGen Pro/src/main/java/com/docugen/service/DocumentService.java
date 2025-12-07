package com.docugen.service;

import com.docugen.dto.DocumentDataDTO;
import com.docugen.entity.DocumentRequest;
import com.docugen.entity.User;
import com.docugen.model.DocumentType;
import com.docugen.repository.DocumentRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final PdfService pdfService;
    private final EmailService emailService;
    private final DocumentRequestRepository documentRequestRepository;

    public void createAndSend(DocumentDataDTO dto, User user) throws Exception {
        // 1. Prepare Thymeleaf Context
        Context context = new Context();
        context.setVariable("clientName", dto.getClientName());
        context.setVariable("freelancerName", dto.getFreelancerName() != null ? dto.getFreelancerName() : user.getFullName());
        context.setVariable("paymentAmount", dto.getPaymentAmount());
        context.setVariable("serviceDescription", dto.getServiceDescription());
        context.setVariable("includeNDA", dto.isIncludeNDA());
        context.setVariable("landlordName", dto.getLandlordName());
        context.setVariable("tenantName", dto.getTenantName());
        context.setVariable("propertyAddress", dto.getPropertyAddress());
        context.setVariable("startDate", dto.getStartDate());
        context.setVariable("endDate", dto.getEndDate());
        context.setVariable("now", LocalDateTime.now());

        // 2. Select Template
        String templateName = getTemplateName(dto.getType());

        // 3. Generate PDF
        byte[] pdfBytes = pdfService.generatePdf(templateName, context);

        // 4. Save Request to DB
        DocumentRequest request = DocumentRequest.builder()
                .user(user)
                .recipientEmail(dto.getRecipientEmail())
                .type(dto.getType())
                .createdAt(LocalDateTime.now())
                .build();

        documentRequestRepository.save(request);

        // 5. Send Email
        String subject = "Your Generated Document: " + dto.getType();
        String body = "Hello " + user.getFullName() + ",\n\nPlease find your generated " + dto.getType() + " attached.";
        String filename = dto.getType().name().toLowerCase() + "_" + System.currentTimeMillis() + ".pdf";

        emailService.sendEmailWithAttachment(
                dto.getRecipientEmail(),
                subject,
                body,
                pdfBytes,
                filename
        );
    }

    private String getTemplateName(DocumentType type) {
        return switch (type) {
            case FREELANCE_CONTRACT -> "freelance";
            case RESIDENTIAL_LEASE -> "lease";
        };
    }
}