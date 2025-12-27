package com.docugen.controller;

import com.docugen.dto.AiTemplateResponse;
import com.docugen.dto.TemplateRequestDTO;
import com.docugen.entity.DocumentTemplate;
import com.docugen.entity.FormField;
import com.docugen.repository.DocumentTemplateRepository;
import com.docugen.service.AiTemplateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/templates")
@RequiredArgsConstructor
@Slf4j
public class AdminTemplateController {

    private final DocumentTemplateRepository templateRepository;
    private final AiTemplateService aiTemplateService;

    // --- AI GENERATION ---
    @PostMapping("/ai/generate")
    public ResponseEntity<?> generateFromAi(@RequestBody String description) {
        try {
            log.info("🎨 AI Generation requested with description: {}", description);
            String cleanedDescription = description.trim().replaceAll("^\"|\"$", "");

            if (cleanedDescription.isEmpty()) {
                return ResponseEntity.badRequest().body("Description cannot be empty");
            }

            AiTemplateResponse response = aiTemplateService.generateTemplate(cleanedDescription);
            log.info("✅ AI template generated successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("❌ AI generation failed", e);
            return ResponseEntity.internalServerError().body("AI Generation failed: " + e.getMessage());
        }
    }

    // --- CRUD OPERATIONS ---

    @GetMapping
    public ResponseEntity<List<DocumentTemplate>> getAllTemplates() {
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

        // Update basic fields
        template.setName(request.getName());
        template.setDescription(request.getDescription());
        template.setContentHtml(request.getContentHtml());
        template.setActive(request.isActive());

        // Update fields: Clear existing and add new
        // The orphanRemoval=true in Entity ensures old fields are deleted from DB
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

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteTemplate(@PathVariable Long id) {
        if (!templateRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        templateRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}