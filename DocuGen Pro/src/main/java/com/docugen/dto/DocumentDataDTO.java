package com.docugen.dto;

import com.docugen.model.DocumentType;
import lombok.Data;

@Data
public class DocumentDataDTO {
    private DocumentType type;
    private String recipientEmail;

    // Freelance Specific
    private String clientName;
    private String freelancerName; // Usually the User's name, but can be overridden
    private Double paymentAmount;
    private String serviceDescription;
    private boolean includeNDA;

    // Lease Specific
    private String landlordName;
    private String tenantName;
    private String propertyAddress;
    private String startDate; // String for simplicity in templates
    private String endDate;
}