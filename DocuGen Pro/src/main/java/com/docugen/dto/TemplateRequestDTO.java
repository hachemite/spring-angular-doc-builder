package com.docugen.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateRequestDTO {
    private Long id;  // ADD THIS - Important for frontend to know the template ID

    @NotBlank
    private String name;

    private String description;

    @NotBlank
    private String contentHtml;

    private boolean active;

    private List<FormFieldDTO> fields;
}