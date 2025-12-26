package com.docugen.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// Lightweight DTO for list views
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateSummaryDTO {
    private Long id;
    private String name;
    private String description;
}