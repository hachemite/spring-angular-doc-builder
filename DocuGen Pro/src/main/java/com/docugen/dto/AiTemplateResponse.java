package com.docugen.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class AiTemplateResponse {
    private String templateName;
    private String description;
    private String htmlContent;
    private List<AiFieldDTO> fields;
}