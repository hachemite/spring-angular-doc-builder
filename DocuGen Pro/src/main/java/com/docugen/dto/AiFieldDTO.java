package com.docugen.dto;

import com.docugen.model.FieldType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AiFieldDTO {
    private String label;
    private String variableName;
    private FieldType type;
    private String options;
}