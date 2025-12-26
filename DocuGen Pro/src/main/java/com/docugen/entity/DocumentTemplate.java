package com.docugen.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "document_templates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    // Use TEXT type for large HTML strings in Postgres
    @Column(name = "content_html", columnDefinition = "TEXT", nullable = false)
    private String contentHtml;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    @OneToMany(mappedBy = "template", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<FormField> fields = new ArrayList<>();

    // Helper method to ensure bidirectional relationship is maintained
    public void addField(FormField field) {
        fields.add(field);
        field.setTemplate(this);
    }
}