import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentService } from '../../../core/service/document';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dynamic-document-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dynamic-document-form.component.html',
  styleUrls: ['./dynamic-document-form.component.css']
})
export class DynamicDocumentFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private docService = inject(DocumentService);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  template: any = null;
  form!: FormGroup;
  loading = true;
  isSubmitting = false;

  recipientControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Template ID from route:', id);
    if (id) {
      this.loadTemplate(+id);
    }
  }

  loadTemplate(id: number) {
    this.loading = true;
    console.log('Loading template with ID:', id);

    this.docService.getTemplateById(id).subscribe({
      next: (data) => {
        console.log('✅ Template loaded:', data);
        this.template = data;
        this.buildForm(data.fields);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Failed to load template:', err);
        this.snackBar.open('Failed to load template', 'Close', { duration: 3000 });
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  buildForm(fields: any[]) {
    console.log('Building form with fields:', fields);
    const group: any = {};

    fields.forEach(field => {
      const validators = [Validators.required];
      const initialValue = field.type === 'CHECKBOX' ? false : '';
      group[field.variableName] = new FormControl(initialValue, validators);
    });

    this.form = this.fb.group(group);
    this.form.addControl('recipientEmail', this.recipientControl);

    console.log('Form built with controls:', Object.keys(this.form.controls));
  }

  getOptions(optionsString: string): string[] {
    return optionsString ? optionsString.split(',').map(o => o.trim()) : [];
  }

  onSubmit() {
    console.log('=== FORM SUBMISSION STARTED ===');

    if (this.form.invalid) {
      console.warn('Form is invalid');
      this.form.markAllAsTouched();
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;

    // Build payload - CRITICAL: Ensure templateId is a NUMBER
    const payload = {
      templateId: this.template.id,  // This should be a number from the loaded template
      ...this.form.value
    };

    console.log('📤 Payload to send:', payload);
    console.log('   templateId type:', typeof payload.templateId);
    console.log('   templateId value:', payload.templateId);
    console.log('   Full form values:', this.form.value);

    this.docService.generateDocument(payload).subscribe({
      next: (response) => {
        console.log('✅ Document generated successfully:', response);
        this.snackBar.open('Document generated successfully! Check your email.', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.isSubmitting = false;
        this.form.reset();
      },
      error: (err) => {
        console.error('❌ Generation error:', err);
        console.error('   Status:', err.status);
        console.error('   Error body:', err.error);

        let errorMessage = 'Failed to generate document';
        if (err.error && typeof err.error === 'string') {
          errorMessage = err.error;
        }

        this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
        this.isSubmitting = false;
      }
    });
  }
}
