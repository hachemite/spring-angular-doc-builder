package com.docugen.dto;

import com.docugen.model.FieldType;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormFieldDTO {
    private Long id; // Null on create
    @NotBlank
    private String label;
    @NotBlank
    private String variableName;
    private FieldType type;
    private String options;
    private int ordering;
}