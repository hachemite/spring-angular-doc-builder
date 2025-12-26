package com.docugen.controller;

import com.docugen.dto.FormFieldDTO;
import com.docugen.dto.TemplateRequestDTO;
import com.docugen.entity.DocumentTemplate;
import com.docugen.entity.FormField;
import com.docugen.repository.DocumentTemplateRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/templates")
@RequiredArgsConstructor
public class AdminTemplateController {

    private final DocumentTemplateRepository templateRepository;

    @GetMapping
    public ResponseEntity<List<DocumentTemplate>> getAllTemplates() {
        // In a real app, you might map this to DTOs, but returning entity is fine for Admin Dashboard
        return ResponseEntity.ok(templateRepository.findAll());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<DocumentTemplate> createTemplate(@Valid @RequestBody TemplateRequestDTO request) {
        DocumentTemplate template = DocumentTemplate.builder()
                .name(request.getName())
                .description(request.getDescription())
                .contentHtml(request.getContentHtml())
                .active(request.isActive())
                .build();

        if (request.getFields() != null) {
            request.getFields().forEach(f -> {
                FormField field = FormField.builder()
                        .label(f.getLabel())
                        .variableName(f.getVariableName())
                        .type(f.getType())
                        .options(f.getOptions())
                        .ordering(f.getOrdering())
                        .build();
                template.addField(field);
            });
        }

        return ResponseEntity.ok(templateRepository.save(template));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<DocumentTemplate> updateTemplate(
            @PathVariable Long id,
            @Valid @RequestBody TemplateRequestDTO request) {

        DocumentTemplate template = templateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Template not found"));

        // Update properties
        template.setName(request.getName());
        template.setDescription(request.getDescription());
        template.setContentHtml(request.getContentHtml());
        template.setActive(request.isActive());

        // Update fields (Full replacement strategy for simplicity)
        template.getFields().clear();

        if (request.getFields() != null) {
            request.getFields().forEach(f -> {
                FormField field = FormField.builder()
                        .label(f.getLabel())
                        .variableName(f.getVariableName())
                        .type(f.getType())
                        .options(f.getOptions())
                        .ordering(f.getOrdering())
                        .build();
                template.addField(field);
            });
        }

        return ResponseEntity.ok(templateRepository.save(template));
    }
}