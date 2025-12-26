import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentService } from '../../../core/service/document';
import { Router } from '@angular/router';

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
    MatCheckboxModule
  ],
  templateUrl: './template-builder.component.html',
  styleUrls: ['./template-builder.component.css']
})
export class TemplateBuilderComponent {
  private fb = inject(FormBuilder);
  private docService = inject(DocumentService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  // Enum values for the dropdown
  fieldTypes = ['TEXT', 'NUMBER', 'DATE', 'SELECT', 'CHECKBOX', 'SIGNATURE'];

  // 1. Main Form (Sent to Backend)
  templateForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    contentHtml: ['', Validators.required], // The raw HTML with placeholders
    active: [true],
    fields: this.fb.array([]) // The dynamic list
  });

  // 2. Mini-Form (For the "Add Field" section)
  addFieldForm: FormGroup = this.fb.group({
    label: ['', Validators.required],
    variableName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]+$')]], // alphanumeric_only
    type: ['TEXT', Validators.required],
    options: [''], // Only for SELECT
    ordering: [1]
  });

  // Getter for the FormArray
  get fieldsArray(): FormArray {
    return this.templateForm.get('fields') as FormArray;
  }

  // Action: Add the field from the mini-form to the main list
  addFieldToParams() {
    if (this.addFieldForm.invalid) return;

    const val = this.addFieldForm.value;

    // Create a new FormGroup for the array
    const fieldGroup = this.fb.group({
      label: [val.label, Validators.required],
      variableName: [val.variableName, Validators.required],
      type: [val.type, Validators.required],
      options: [val.options],
      ordering: [this.fieldsArray.length + 1] // Auto-increment order
    });

    this.fieldsArray.push(fieldGroup);

    // Reset mini-form
    this.addFieldForm.reset({ type: 'TEXT', ordering: this.fieldsArray.length + 1 });
  }

  // Action: Remove a field from the list
  removeField(index: number) {
    this.fieldsArray.removeAt(index);
  }

  // Action: Save to Backend
  onSubmit() {
    if (this.templateForm.invalid) {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.docService.createTemplate(this.templateForm.value).subscribe({
      next: (res) => {
        this.snackBar.open('Template created successfully!', 'Close', { duration: 5000, panelClass: ['success-snackbar'] });
        // Optionally navigate away or reset
        // this.router.navigate(['/dashboard']);
        this.templateForm.reset();
        this.fieldsArray.clear();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to create template', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    });
  }
}
