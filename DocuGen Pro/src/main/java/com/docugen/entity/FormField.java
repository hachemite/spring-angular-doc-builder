package com.docugen.entity;

import com.docugen.model.FieldType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "form_fields")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FormField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String label;

    @Column(name = "variable_name", nullable = false)
    private String variableName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FieldType type;

    // Comma separated values for SELECT type (e.g. "Option A,Option B")
    private String options;

    @Column(nullable = false)
    private int ordering;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id", nullable = false)
    @JsonIgnore // Prevent circular recursion in JSON serialization
    private DocumentTemplate template;
}