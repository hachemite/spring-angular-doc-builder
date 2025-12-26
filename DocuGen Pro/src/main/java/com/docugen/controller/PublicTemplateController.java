package com.docugen.controller;

import com.docugen.dto.FormFieldDTO;
import com.docugen.dto.TemplateRequestDTO;
import com.docugen.dto.TemplateSummaryDTO;
import com.docugen.entity.DocumentTemplate;
import com.docugen.repository.DocumentTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/templates")
@RequiredArgsConstructor
public class PublicTemplateController {

    private final DocumentTemplateRepository templateRepository;

    // Returns lightweight list for the selection dropdown/page
    @GetMapping
    public ResponseEntity<List<TemplateSummaryDTO>> getActiveTemplates() {
        List<TemplateSummaryDTO> summaries = templateRepository.findByActiveTrue()
                .stream()
                .map(t -> new TemplateSummaryDTO(t.getId(), t.getName(), t.getDescription()))
                .collect(Collectors.toList());

        System.out.println("📋 Returning " + summaries.size() + " active templates");
        return ResponseEntity.ok(summaries);
    }

    // Returns full details so the Frontend can build the form dynamically
    @GetMapping("/{id}")
    public ResponseEntity<TemplateRequestDTO> getTemplateDetails(@PathVariable Long id) {
        System.out.println("🔍 Fetching template details for ID: " + id);

        DocumentTemplate template = templateRepository.findById(id)
                .filter(DocumentTemplate::isActive)
                .orElseThrow(() -> new RuntimeException("Template not found or inactive"));

        System.out.println("✅ Found template: " + template.getName() + " (ID: " + template.getId() + ")");

        // Map Entity to DTO
        List<FormFieldDTO> fieldDtos = template.getFields().stream()
                .map(f -> FormFieldDTO.builder()
                        .id(f.getId())
                        .label(f.getLabel())
                        .variableName(f.getVariableName())
                        .type(f.getType())
                        .options(f.getOptions())
                        .ordering(f.getOrdering())
                        .build())
                .collect(Collectors.toList());

        System.out.println("   Fields: " + fieldDtos.size());

        TemplateRequestDTO response = TemplateRequestDTO.builder()
                .id(template.getId())  // CRITICAL: Include the ID!
                .name(template.getName())
                .description(template.getDescription())
                .contentHtml(template.getContentHtml())
                .active(template.isActive())
                .fields(fieldDtos)
                .build();

        return ResponseEntity.ok(response);
    }
}