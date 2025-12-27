import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentService } from '../../../core/service/document';
import { Router, ActivatedRoute } from '@angular/router'; // Added ActivatedRoute

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-template-builder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  templateUrl: './template-builder.component.html',
  styleUrls: ['./template-builder.component.css']
})
export class TemplateBuilderComponent implements OnInit {
  private fb = inject(FormBuilder);
  private docService = inject(DocumentService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // Inject Route to get ID

  // State
  isEditMode = false;
  templateId: number | null = null;
  isLoading = false; // For fetching existing data
  isAiLoading = false; // For AI generation

  exampleCode = '<span th:text="${variable_name}"></span>';
  fieldTypes = ['TEXT', 'NUMBER', 'DATE', 'SELECT', 'CHECKBOX', 'SIGNATURE'];

  // Main Form
  templateForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    contentHtml: ['', Validators.required],
    active: [true],
    fields: this.fb.array([])
  });

  // Sidebar "Add Field" Form
  addFieldForm: FormGroup = this.fb.group({
    label: ['', Validators.required],
    variableName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]+$')]],
    type: ['TEXT', Validators.required],
    options: [''],
    ordering: [1]
  });

  get fieldsArray(): FormArray {
    return this.templateForm.get('fields') as FormArray;
  }

  // --- 1. INITIALIZATION & ROUTING ---
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // EDIT MODE
      this.isEditMode = true;
      this.templateId = +id;
      this.loadTemplate(this.templateId);
    } else {
      // CREATE MODE
      this.isEditMode = false;
    }
  }

  // --- 2. HYDRATION (Load Data) ---
  loadTemplate(id: number) {
    this.isLoading = true;

    this.docService.getTemplateById(id).subscribe({
      next: (data) => {
        // A. Patch Top-Level Fields
        this.templateForm.patchValue({
          name: data.name,
          description: data.description,
          contentHtml: data.contentHtml,
          active: data.active
        });

        // B. Rebuild FormArray
        // patchValue cannot handle arrays of different lengths, so we rebuild it.
        this.fieldsArray.clear();

        if (data.fields && data.fields.length > 0) {
          // Sort to ensure UI order matches logical order
          data.fields.sort((a: any, b: any) => a.ordering - b.ordering);

          data.fields.forEach((field: any) => {
            const group = this.createFieldGroup(field);
            this.fieldsArray.push(group);
          });
        }

        // Update the ordering counter for the "Add Field" form
        this.addFieldForm.patchValue({ ordering: this.fieldsArray.length + 1 });
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to load template', 'Close', { duration: 3000 });
        this.router.navigate(['/admin/dashboard']); // Fallback
        this.isLoading = false;
      }
    });
  }

  // --- 3. HELPER: Field Factory ---
  // Standardizes creation of field FormGroups (DRY Principle)
  private createFieldGroup(data?: any): FormGroup {
    return this.fb.group({
      label: [data?.label || '', Validators.required],
      variableName: [data?.variableName || '', Validators.required],
      type: [data?.type || 'TEXT', Validators.required],
      options: [data?.options || ''],
      ordering: [data?.ordering || (this.fieldsArray.length + 1)]
    });
  }

  // --- 4. ACTION HANDLERS ---

  // Manual Add
  addFieldToParams() {
    if (this.addFieldForm.invalid) return;

    const group = this.createFieldGroup(this.addFieldForm.value);
    this.fieldsArray.push(group);

    this.addFieldForm.reset({ type: 'TEXT', ordering: this.fieldsArray.length + 1 });
  }

  // AI Generation Populator
  populateForm(aiResponse: any) {
    this.templateForm.patchValue({
      name: aiResponse.templateName,
      description: aiResponse.description,
      contentHtml: aiResponse.htmlContent
    });

    this.fieldsArray.clear();

    if (aiResponse.fields && Array.isArray(aiResponse.fields)) {
      aiResponse.fields.forEach((f: any, index: number) => {
        const fieldData = { ...f, ordering: index + 1 };
        this.fieldsArray.push(this.createFieldGroup(fieldData));
      });
    }
  }

  removeField(index: number) {
    this.fieldsArray.removeAt(index);
  }

  // --- 5. SAVE STRATEGY (Switch on Mode) ---
  onSubmit() {
    if (this.templateForm.invalid) {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
      return;
    }

    const formData = this.templateForm.value;

    if (this.isEditMode && this.templateId) {
      // UPDATE
      this.docService.updateTemplate(this.templateId, formData).subscribe({
        next: () => {
          this.snackBar.open('Template updated successfully!', 'Close', { duration: 5000, panelClass: ['success-snackbar'] });
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to update template', 'Close', { duration: 3000 });
        }
      });
    } else {
      // CREATE
      this.docService.createTemplate(formData).subscribe({
        next: () => {
          this.snackBar.open('Template created successfully!', 'Close', { duration: 5000, panelClass: ['success-snackbar'] });
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to create template', 'Close', { duration: 3000 });
        }
      });
    }
  }

  // --- AI PROMPT LOGIC ---
  openAiPrompt() {
    const description = prompt("Describe the document you want to create:");
    if (description && description.trim().length > 5) {
      this.generateFromAi(description);
    }
  }

  generateFromAi(description: string) {
    this.isAiLoading = true;
    this.snackBar.open('✨ AI is dreaming up your template...', 'Close', { duration: 8000 });

    this.docService.generateTemplateFromAi(description).subscribe({
      next: (res: any) => {
        this.isAiLoading = false;
        this.populateForm(res);
        this.snackBar.open('Template generated successfully!', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
      },
      error: (err) => {
        console.error(err);
        this.isAiLoading = false;
        this.snackBar.open('AI Generation failed.', 'Close', { duration: 5000 });
      }
    });
  }
}
