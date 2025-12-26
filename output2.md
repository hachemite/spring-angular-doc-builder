# Repository Content

## File Structure

```
└── DocuGen Pro
    ├── pom.xml
    ├── src
    │   └── main
    │       └── java
    │           ├── com
    │           │   └── docugen
    │           │       └── config
    │           │           ├── ApplicationConfig.java
    │           │           ├── DataSeeder.java
    │           │           ├── ThymeleafConfig.java
    │           │       └── controller
    │           │           ├── AdminTemplateController.java
    │           │           ├── AuthController.java
    │           │           ├── DocumentController.java
    │           │           ├── PublicTemplateController.java
    │           │       └── DocuGenProApplication.java
    │           │       └── dto
    │           │           ├── AuthResponse.java
    │           │           ├── DocumentDataDTO.java
    │           │           ├── FormFieldDTO.java
    │           │           ├── LoginRequest.java
    │           │           ├── RegisterRequest.java
    │           │           ├── TemplateRequestDTO.java
    │           │           ├── TemplateSummaryDTO.java
    │           │       └── entity
    │           │           ├── DocumentRequest.java
    │           │           ├── DocumentTemplate.java
    │           │           ├── FormField.java
    │           │           ├── User.java
    │           │       └── model
    │           │           ├── DocumentType.java
    │           │           ├── FieldType.java
    │           │           ├── Role.java
    │           │       └── repository
    │           │           ├── DocumentRequestRepository.java
    │           │           ├── DocumentTemplateRepository.java
    │           │           ├── UserRepository.java
    │           │       └── security
    │           │           ├── JwtAuthenticationFilter.java
    │           │           ├── JwtService.java
    │           │           ├── SecurityConfig.java
    │           │       └── service
    │           │           └── DocumentService.java
    │           │           └── DynamicPdfService.java
    │           │           └── EmailService.java
    │           │           └── PdfService.java
    │       └── resources
    │           └── application.properties
    │           └── templates
    │               └── freelance.html
    │               └── lease.html
└── docugen-frontend
    └── angular.json
    └── package.json
    └── src
        └── app
            ├── app.config.ts
            ├── app.css
            ├── app.html
            ├── app.routes.ts
            ├── app.spec.ts
            ├── app.ts
            ├── core
            │   ├── guard
            │   │   ├── auth-guard.spec.ts
            │   │   ├── auth-guard.ts
            │   ├── interceptor
            │   │   ├── auth-interceptor.spec.ts
            │   │   ├── auth-interceptor.ts
            │   ├── service
            │   │   └── auth.spec.ts
            │   │   └── auth.ts
            │   │   └── document.spec.ts
            │   │   └── document.ts
            ├── features
            │   └── admin
            │       ├── template-builder.component
            │       │   └── template-builder.component.css
            │       │   └── template-builder.component.html
            │       │   └── template-builder.component.spec.ts
            │       │   └── template-builder.component.ts
            │   └── auth
            │       ├── login.component
            │       │   ├── login.component.css
            │       │   ├── login.component.html
            │       │   ├── login.component.spec.ts
            │       │   ├── login.component.ts
            │       ├── register.component
            │       │   └── register.component.css
            │       │   └── register.component.html
            │       │   └── register.component.spec.ts
            │       │   └── register.component.ts
            │   └── dashboard
            │       └── dashboard.component.css
            │       └── dashboard.component.html
            │       └── dashboard.component.spec.ts
            │       └── dashboard.component.ts
            │       └── dynamic-document-form.component
            │           └── dynamic-document-form.component.css
            │           └── dynamic-document-form.component.html
            │           └── dynamic-document-form.component.spec.ts
            │           └── dynamic-document-form.component.ts
        └── custom-theme.scss
        └── environments
            ├── environment.development.ts
            ├── environment.ts
        └── index.html
        └── main.ts
        └── styles.css
```

## File Contents

######
docugen-frontend/src/app/features/admin/template-builder.component/template-builder.component.html
######

```
<div class="min-h-screen bg-gray-50 p-4 md:p-8">

  <div class="max-w-7xl mx-auto mb-6 flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-light text-gray-800">Template Builder</h1>
      <p class="text-gray-500 text-sm">Design dynamic document templates for your team.</p>
    </div>
    <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="templateForm.invalid" class="px-6">
      <mat-icon>save</mat-icon> Save Template
    </button>
  </div>

  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

    <div class="lg:col-span-8 flex flex-col gap-6">

      <mat-card appearance="outlined" class="bg-white shadow-sm">
        <mat-card-header>
          <mat-card-title>General Information</mat-card-title>
        </mat-card-header>
        <mat-card-content class="p-4 pt-6 flex flex-col gap-4">
          <form [formGroup]="templateForm" class="flex flex-col gap-4">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Template Name</mat-label>
                <input matInput formControlName="name" placeholder="e.g. Non-Disclosure Agreement">
                <mat-error>Name is required</mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Description</mat-label>
                <input matInput formControlName="description" placeholder="Brief summary of this doc">
              </mat-form-field>
            </div>

            <mat-checkbox formControlName="active" color="primary">Active (Visible to Users)</mat-checkbox>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card appearance="outlined" class="bg-white shadow-sm">
        <mat-card-header>
          <mat-card-title>Document Content (HTML)</mat-card-title>
        </mat-card-header>
        <mat-card-content class="p-4">

          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r" ngNonBindable>
            <div class="flex items-start">
              <mat-icon class="text-blue-500 mr-2">info</mat-icon>
              <div class="text-sm text-blue-900">
                <p class="font-bold">How to use variables:</p>
                <p>Use Thymeleaf syntax to inject field values. Example:</p>
                <code class="bg-blue-100 px-2 py-1 rounded text-xs mt-1 block w-fit">
                  &lt;span th:text="$&#123;client_name&#125;"&gt;Default Value&lt;/span&gt;
                </code>
              </div>
            </div>
          </div>

          <form [formGroup]="templateForm">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>HTML Code</mat-label>
              <textarea matInput formControlName="contentHtml"
                        class="font-mono text-sm leading-relaxed min-h-[400px]"
                        placeholder="<html><body><h1>Title</h1>...</body></html>"></textarea>
              <mat-hint align="end">{{ templateForm.get('contentHtml')?.value?.length || 0 }} chars</mat-hint>
            </mat-form-field>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card appearance="outlined" class="bg-white shadow-sm">
        <mat-card-header>
          <mat-card-title>
            Configured Fields
            <span class="ml-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{{ fieldsArray.length }}</span>
          </mat-card-title>
        </mat-card-header>
        <mat-card-content class="p-4">

          @if (fieldsArray.length === 0) {
            <div class="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <mat-icon class="text-gray-400 text-5xl h-12 w-12 mb-2">list_alt</mat-icon>
              <p class="text-gray-500 font-medium">No fields defined yet.</p>
              <p class="text-gray-400 text-sm">Use the panel on the right to add fields.</p>
            </div>
          } @else {
            <div class="space-y-3">
              @for (field of fieldsArray.controls; track field; let i = $index) {
                <div class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors shadow-sm">

                  <div class="flex items-center gap-4">
                    <div class="bg-blue-100 text-blue-700 h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs">
                      {{ i + 1 }}
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900 m-0">{{ field.get('label')?.value }}</h4>
                      <div class="flex gap-2 text-xs text-gray-500 mt-1">
                        <span class="bg-gray-100 px-2 py-0.5 rounded font-mono">var: {{ field.get('variableName')?.value }}</span>
                        <span class="bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-mono border border-purple-100">{{ field.get('type')?.value }}</span>
                      </div>
                    </div>
                  </div>

                  <button mat-icon-button color="warn" (click)="removeField(i)" matTooltip="Remove Field">
                    <mat-icon>delete_outline</mat-icon>
                  </button>
                </div>
              }
            </div>
          }

        </mat-card-content>
      </mat-card>

    </div>

    <div class="lg:col-span-4">
      <div class="sticky top-6"> <mat-card appearance="raised" class="bg-white border-t-4 border-t-blue-500 shadow-md">
          <mat-card-header>
            <mat-card-title class="pt-2">Add New Field</mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-4">

            <form [formGroup]="addFieldForm" class="flex flex-col gap-4">

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Field Label</mat-label>
                <input matInput formControlName="label" placeholder="e.g. Client Name">
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Variable Name</mat-label>
                <input matInput formControlName="variableName" placeholder="e.g. client_name">
                <mat-hint>Used in HTML ({{ '{' }}{{ '{' }}var{{ '}' }}{{ '}' }})</mat-hint>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Input Type</mat-label>
                <mat-select formControlName="type">
                  @for (type of fieldTypes; track type) {
                    <mat-option [value]="type">{{ type }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              @if (addFieldForm.get('type')?.value === 'SELECT') {
                <mat-form-field appearance="outline" class="w-full">
                  <mat-label>Options (Comma Separated)</mat-label>
                  <input matInput formControlName="options" placeholder="Option A, Option B, Option C">
                  <mat-hint>Example: Red, Green, Blue</mat-hint>
                </mat-form-field>
              }

              <div class="mt-2">
                <button mat-flat-button color="accent" class="w-full py-6"
                        (click)="addFieldToParams()"
                        [disabled]="addFieldForm.invalid">
                  <mat-icon>add_circle</mat-icon> Add to Template
                </button>
              </div>

            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>

  </div>
</div>

```

######
DocuGen Pro/pom.xml
######

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
		 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.3.0</version>
		<relativePath/> </parent>
	<groupId>com.docugen</groupId>
	<artifactId>docugen-pro</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>DocuGen Pro</name>
	<description>SaaS for generating legal documents</description>

	<properties>
		<java.version>17</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>

		<dependency>
			<groupId>org.postgresql</groupId>
			<artifactId>postgresql</artifactId>
			<scope>runtime</scope>
		</dependency>

		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<optional>true</optional>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-validation</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-mail</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-thymeleaf</artifactId>
		</dependency>

		<dependency>
			<groupId>com.github.librepdf</groupId>
			<artifactId>openpdf</artifactId>
			<version>1.3.30</version>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>com.github.librepdf</groupId>
			<artifactId>openpdf</artifactId>
			<version>1.3.30</version>
		</dependency>
		<dependency>
			<groupId>org.xhtmlrenderer</groupId>
			<artifactId>flying-saucer-pdf-openpdf</artifactId>
			<version>9.1.22</version>
		</dependency>

		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-api</artifactId>
			<version>0.11.5</version>
		</dependency>

		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-impl</artifactId>
			<version>0.11.5</version>
			<scope>runtime</scope>
		</dependency>

		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-jackson</artifactId> <version>0.11.5</version>
			<scope>runtime</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
				<configuration>
					<excludes>
						<exclude>
							<groupId>org.projectlombok</groupId>
							<artifactId>lombok</artifactId>
						</exclude>
					</excludes>
				</configuration>
			</plugin>
		</plugins>
	</build>
</project>
```

######
docugen-frontend/src/app/features/admin/template-builder.component/template-builder.component.ts
######

```
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

```

######
docugen-frontend/src/app/features/dashboard/dynamic-document-form.component/dynamic-document-form.component.ts
######

```
import { Component, OnInit, inject, Input } from '@angular/core';
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
import { MatDividerModule } from '@angular/material/divider'; // <--- ADDED THIS

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
    MatDividerModule // <--- ADDED THIS
  ],
  templateUrl: './dynamic-document-form.component.html',
  styleUrls: ['./dynamic-document-form.component.css']
})
export class DynamicDocumentFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private docService = inject(DocumentService);
  private snackBar = inject(MatSnackBar);

  template: any = null;
  form!: FormGroup;
  loading = true;
  isSubmitting = false;

  // Recipient email is always required, outside the dynamic fields
  recipientControl = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    // 1. Get Template ID from URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTemplate(+id);
    }
  }

  loadTemplate(id: number) {
    this.docService.getTemplateById(id).subscribe({
      next: (data) => {
        this.template = data;
        this.buildForm(data.fields);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to load template', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  // 2. The Core Logic: Turn JSON fields into Angular Controls
  buildForm(fields: any[]) {
    const group: any = {};

    fields.forEach(field => {
      // Default validations
      const validators = [Validators.required]; // Assume all dynamic fields are required for now

      // Initialize control with default value
      // Checkbox needs false, others can be empty string
      const initialValue = field.type === 'CHECKBOX' ? false : '';

      group[field.variableName] = new FormControl(initialValue, validators);
    });

    this.form = this.fb.group(group);
    // Add the static recipient email control to the form group
    this.form.addControl('recipientEmail', this.recipientControl);
  }

  // Helper to split "Option A,Option B" into an array
  getOptions(optionsString: string): string[] {
    return optionsString ? optionsString.split(',').map(o => o.trim()) : [];
  }

  onSubmit() {
    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    this.isSubmitting = true;

    // Merge template Type/ID into the payload
    const payload = {
        templateId: this.template.id, // Backend needs to know which template to use
        ...this.form.value
    };

    console.log('Submitting Payload:', payload);

    // Placeholder for submission logic (we will add the real service call next)
    this.snackBar.open('Generating Document... (Check Console)', 'Close', { duration: 3000 });
    this.isSubmitting = false;
  }
}

```

######
docugen-frontend/src/app/features/dashboard/dynamic-document-form.component/dynamic-document-form.component.html
######

```
<div class="flex justify-center min-h-screen bg-gray-50 p-6">

  <div *ngIf="loading" class="flex justify-center items-center w-full h-64">
    <span class="text-gray-500">Loading Template...</span>
  </div>

  <mat-card *ngIf="!loading && template" class="w-full max-w-2xl">
    <mat-card-header class="mb-4 border-b pb-4">
      <mat-card-title>{{ template.name }}</mat-card-title>
      <mat-card-subtitle>{{ template.description }}</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">

        <mat-form-field appearance="outline">
          <mat-label>Recipient Email</mat-label>
          <input matInput formControlName="recipientEmail" placeholder="client@example.com">
          <mat-error>Valid email is required</mat-error>
        </mat-form-field>

        <mat-divider></mat-divider>
        <h3 class="text-gray-700 font-medium mt-2">Document Details</h3>

        <ng-container *ngFor="let field of template.fields">

          <div [ngSwitch]="field.type">

            <mat-form-field *ngSwitchCase="'TEXT'" appearance="outline" class="w-full">
              <mat-label>{{ field.label }}</mat-label>
              <input matInput [formControlName]="field.variableName" type="text">
            </mat-form-field>

            <mat-form-field *ngSwitchCase="'NUMBER'" appearance="outline" class="w-full">
              <mat-label>{{ field.label }}</mat-label>
              <input matInput [formControlName]="field.variableName" type="number">
            </mat-form-field>

            <mat-form-field *ngSwitchCase="'DATE'" appearance="outline" class="w-full">
              <mat-label>{{ field.label }}</mat-label>
              <input matInput [matDatepicker]="picker" [formControlName]="field.variableName">
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>

            <mat-form-field *ngSwitchCase="'SELECT'" appearance="outline" class="w-full">
              <mat-label>{{ field.label }}</mat-label>
              <mat-select [formControlName]="field.variableName">
                <mat-option *ngFor="let opt of getOptions(field.options)" [value]="opt">
                  {{ opt }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <div *ngSwitchCase="'CHECKBOX'" class="py-2">
              <mat-checkbox [formControlName]="field.variableName" color="primary">
                {{ field.label }}
              </mat-checkbox>
            </div>

            <mat-form-field *ngSwitchCase="'SIGNATURE'" appearance="outline" class="w-full">
              <mat-label>{{ field.label }} (Type Name to Sign)</mat-label>
              <input matInput [formControlName]="field.variableName" class="font-cursive">
              <mat-icon matSuffix>draw</mat-icon>
            </mat-form-field>

          </div>
        </ng-container>

        <div class="mt-6 flex justify-end">
          <button mat-raised-button color="primary" type="submit"
                  class="px-8 py-2"
                  [disabled]="form.invalid || isSubmitting">
            <mat-icon>send</mat-icon> Generate Document
          </button>
        </div>

      </form>
    </mat-card-content>
  </mat-card>
</div>

```

######
DocuGen Pro/src/main/java/com/docugen/security/SecurityConfig.java
######

```
package com.docugen.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Disable CSRF (Stateful sessions not used)
                .csrf(AbstractHttpConfigurer::disable)

                // 2. Enable CORS (Allow Angular localhost:4200)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 3. Define URL Access Rules (Order matters!)
                .authorizeHttpRequests(auth -> auth
                        // Public Endpoints
                        .requestMatchers("/api/auth/**").permitAll()

                        // Admin Only Endpoints (Matches AdminTemplateController)
                        // hasRole("ADMIN") checks for authority "ROLE_ADMIN"
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // User & Admin Endpoints (Document Generation, Public Templates)
                        .requestMatchers("/api/documents/**", "/api/templates/**").authenticated()

                        // Catch-all
                        .anyRequest().authenticated()
                )

                // 4. stateless Session Management
                .sessionManagement(sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 5. Auth Provider & Filter
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Allow Frontend Origin
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));

        // Allow HTTP Methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow Headers (Authorization is crucial for JWT)
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Cache-Control"));

        // Allow credentials (optional for Authorization header, but good practice)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

######
DocuGen Pro/src/main/java/com/docugen/service/DocumentService.java
######

```
package com.docugen.service;

import com.docugen.dto.DocumentDataDTO;
import com.docugen.entity.DocumentRequest;
import com.docugen.entity.User;
import com.docugen.model.DocumentType;
import com.docugen.repository.DocumentRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final PdfService pdfService;
    private final EmailService emailService;
    private final DocumentRequestRepository documentRequestRepository;

    public void createAndSend(DocumentDataDTO dto, User user) throws Exception {
        // 1. Prepare Thymeleaf Context
        Context context = new Context();
        context.setVariable("clientName", dto.getClientName());
        context.setVariable("freelancerName", dto.getFreelancerName() != null ? dto.getFreelancerName() : user.getFullName());
        context.setVariable("paymentAmount", dto.getPaymentAmount());
        context.setVariable("serviceDescription", dto.getServiceDescription());
        context.setVariable("includeNDA", dto.isIncludeNDA());
        context.setVariable("landlordName", dto.getLandlordName());
        context.setVariable("tenantName", dto.getTenantName());
        context.setVariable("propertyAddress", dto.getPropertyAddress());
        context.setVariable("startDate", dto.getStartDate());
        context.setVariable("endDate", dto.getEndDate());
        context.setVariable("now", LocalDateTime.now());

        // 2. Select Template
        String templateName = getTemplateName(dto.getType());

        // 3. Generate PDF
        byte[] pdfBytes = pdfService.generatePdf(templateName, context);

        // 4. Save Request to DB
        DocumentRequest request = DocumentRequest.builder()
                .user(user)
                .recipientEmail(dto.getRecipientEmail())
                .type(dto.getType())
                .createdAt(LocalDateTime.now())
                .build();

        documentRequestRepository.save(request);

        // 5. Send Email
        String subject = "Your Generated Document: " + dto.getType();
        String body = "Hello " + user.getFullName() + ",\n\nPlease find your generated " + dto.getType() + " attached.";
        String filename = dto.getType().name().toLowerCase() + "_" + System.currentTimeMillis() + ".pdf";

        emailService.sendEmailWithAttachment(
                dto.getRecipientEmail(),
                subject,
                body,
                pdfBytes,
                filename
        );
    }

    private String getTemplateName(DocumentType type) {
        return switch (type) {
            case FREELANCE_CONTRACT -> "freelance";
            case RESIDENTIAL_LEASE -> "lease";
        };
    }
}
```

######
DocuGen Pro/src/main/java/com/docugen/service/DynamicPdfService.java
######

```
package com.docugen.service;

import com.docugen.entity.DocumentTemplate;
import com.docugen.repository.DocumentTemplateRepository;
import com.lowagie.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DynamicPdfService {

    private final DocumentTemplateRepository templateRepository;
    private final TemplateEngine stringTemplateEngine; // Inject our custom engine

    public byte[] generatePdf(Long templateId, Map<String, Object> userData) throws IOException, DocumentException {
        // 1. Fetch Template
        DocumentTemplate template = templateRepository.findById(templateId)
                .orElseThrow(() -> new RuntimeException("Template not found"));

        // 2. Pre-process Data (Handle Signatures)
        processSignatures(userData);

        // 3. Prepare Context
        Context context = new Context();
        context.setVariables(userData);

        // 4. Render HTML String (Replace placeholders)
        // We use the raw HTML content from the DB as the "template"
        String processedHtml = stringTemplateEngine.process(template.getContentHtml(), context);

        // 5. Convert to PDF
        return renderHtmlToPdf(processedHtml);
    }

    private byte[] renderHtmlToPdf(String html) throws IOException, DocumentException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ITextRenderer renderer = new ITextRenderer();

        // Ensure the HTML is valid XML (required by OpenPDF/FlyingSaucer)
        // In a production app, you might use Jsoup to clean/fix the HTML first
        renderer.setDocumentFromString(html);
        renderer.layout();
        renderer.createPDF(outputStream);

        return outputStream.toByteArray();
    }

    /**
     * Scans the user data for Base64 signature images.
     * If found, wraps them in an <img> tag so the PDF renderer displays them.
     */
    private void processSignatures(Map<String, Object> data) {
        for (Map.Entry<String, Object> entry : data.entrySet()) {
            Object value = entry.getValue();
            if (value instanceof String && isBase64Image((String) value)) {
                // Transform raw Base64 string into an HTML img tag
                String htmlImg = String.format("<img src='%s' width='150' height='50' />", value);
                data.put(entry.getKey(), htmlImg);
            }
        }
    }

    private boolean isBase64Image(String value) {
        return value.startsWith("data:image/");
    }
}
```

######
DocuGen Pro/src/main/java/com/docugen/security/JwtService.java
######

```
package com.docugen.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    // In production, move this to application.properties
    private static final String SECRET_KEY = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // ENHANCED: Include role in JWT claims
    public String generateToken(UserDetails userDetails, String role) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", role);
        return generateToken(extraClaims, userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hours
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
```

######
DocuGen Pro/src/main/java/com/docugen/controller/AdminTemplateController.java
######

```
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
```

######
docugen-frontend/src/app/core/service/auth.ts
######

```
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface AuthResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/auth`;

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.storeUserInfo(response.token))
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => this.storeUserInfo(response.token))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('userRole');
    return role === 'ADMIN';
  }

  private storeUserInfo(token: string): void {
    localStorage.setItem('token', token);

    // Decode JWT to get user role
    try {
      const payload = this.decodeToken(token);
      if (payload.role) {
        localStorage.setItem('userRole', payload.role);
      }
      if (payload.sub) {
        localStorage.setItem('userEmail', payload.sub);
      }
    } catch (e) {
      console.error('Error decoding token:', e);
    }
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return {};
    }
  }
}

```

######
DocuGen Pro/src/main/java/com/docugen/controller/AuthController.java
######

```
package com.docugen.controller;

import com.docugen.dto.AuthResponse;
import com.docugen.dto.LoginRequest;
import com.docugen.dto.RegisterRequest;
import com.docugen.entity.User;
import com.docugen.model.Role;
import com.docugen.repository.UserRepository;
import com.docugen.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().build();
        }

        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER) // Default role
                .build();

        userRepository.save(user);

        // Generate token with role included
        var userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                java.util.Collections.singleton(
                        new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + user.getRole().name())
                )
        );

        var jwtToken = jwtService.generateToken(userDetails, user.getRole().name());
        return ResponseEntity.ok(AuthResponse.builder().token(jwtToken).build());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                java.util.Collections.singleton(
                        new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + user.getRole().name())
                )
        );

        var jwtToken = jwtService.generateToken(userDetails, user.getRole().name());
        return ResponseEntity.ok(AuthResponse.builder().token(jwtToken).build());
    }
}
```

######
docugen-frontend/angular.json
######

```
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm",
    "analytics": "dfffd5e0-2c91-479e-a532-4631753d73cf"
  },
  "newProjectRoot": "projects",
  "projects": {
    "docugen-frontend": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/custom-theme.scss",
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true,
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.development.ts"
                }
              ]
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "docugen-frontend:build:production"
            },
            "development": {
              "buildTarget": "docugen-frontend:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular/build:unit-test"
        }
      }
    }
  }
}

```

######
docugen-frontend/src/app/features/dashboard/dashboard.component.html
######

```
<div class="p-8 min-h-screen bg-gray-50">

  <h1 class="text-3xl font-bold text-gray-800 mb-2">Select a Document</h1>
  <p class="text-gray-600 mb-8">Choose a template to start generating your legal document.</p>

  <div *ngIf="loading" class="flex justify-center mt-10">
    <mat-spinner diameter="50"></mat-spinner>
  </div>

  <div *ngIf="!loading && templates.length === 0" class="text-center mt-10 p-10 bg-white rounded shadow">
    <mat-icon class="text-6xl text-gray-300 h-16 w-16">folder_open</mat-icon>
    <p class="text-xl text-gray-500 mt-4">No active templates found.</p>
    <p class="text-sm text-gray-400">Please ask an Admin to create one.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    @for (t of templates; track t.id) {
      <mat-card class="hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200"
                (click)="openTemplate(t.id)">
        <mat-card-header class="bg-blue-50 p-4 border-b border-gray-100">
          <div mat-card-avatar class="bg-blue-600 rounded-full flex items-center justify-center text-white">
            <mat-icon>description</mat-icon>
          </div>
          <mat-card-title class="mt-1 text-blue-900">{{ t.name }}</mat-card-title>
        </mat-card-header>

        <mat-card-content class="p-4 min-h-[80px]">
          <p class="text-gray-600 text-sm mt-2">
            {{ t.description || 'No description available for this document template.' }}
          </p>
        </mat-card-content>

        <mat-card-actions align="end" class="p-2 border-t border-gray-100">
          <button mat-button color="primary">START</button>
        </mat-card-actions>
      </mat-card>
    }
  </div>
</div>

```

######
docugen-frontend/src/app/app.ts
######

```
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

// Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from './core/service/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <button mat-icon-button class="menu-icon" aria-label="Menu icon">
        <mat-icon>description</mat-icon>
      </button>

      <span class="logo" routerLink="/">DocuGen Pro</span>

      <span class="spacer"></span>

      <div *ngIf="!isLoggedIn" class="nav-buttons">
        <button mat-button routerLink="/login">Login</button>
        <button mat-raised-button color="accent" routerLink="/register">Get Started</button>
      </div>

      <div *ngIf="isLoggedIn" class="nav-buttons">
        <!-- Only show Builder button to admins -->
        <button *ngIf="isAdmin" mat-button routerLink="/admin/builder">
          <mat-icon>build</mat-icon> Builder
        </button>

        <button mat-button routerLink="/dashboard">
          <mat-icon>dashboard</mat-icon> Dashboard
        </button>

        <button mat-icon-button (click)="logout()" title="Logout">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </mat-toolbar>

    <div class="main-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  private authService = inject(AuthService);
  private router = inject(Router);

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
}

```

######
DocuGen Pro/src/main/java/com/docugen/controller/DocumentController.java
######

```
package com.docugen.controller;

import com.docugen.dto.DocumentDataDTO;
import com.docugen.entity.User;
import com.docugen.repository.UserRepository;
import com.docugen.service.DocumentService;
import com.docugen.service.DynamicPdfService;
import lombok.RequiredArgsConstructor;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final UserRepository userRepository;
    // FIX 2: Make this final so Lombok handles the injection (Removed @Autowired)
    private final DynamicPdfService dynamicPdfService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateDocument(@RequestBody DocumentDataDTO dto) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            documentService.createAndSend(dto, user);

            return ResponseEntity.ok("Document generated and emailed successfully to " + dto.getRecipientEmail());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error generating document: " + e.getMessage());
        }
    }

    @PostMapping("/generate-dynamic")
    public ResponseEntity<String> generateDynamicDocument(@RequestBody Map<String, Object> payload) {
        try {
            if (!payload.containsKey("templateId")) {
                return ResponseEntity.badRequest().body("templateId is required");
            }

            // Safer casting
            Long templateId = Long.valueOf(payload.get("templateId").toString());

            byte[] pdfBytes = dynamicPdfService.generatePdf(templateId, payload);

            // In a real app, you would probably save this or email it here
            return ResponseEntity.ok("Dynamic Document generated successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}
```

######
DocuGen Pro/src/main/java/com/docugen/controller/PublicTemplateController.java
######

```
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

        return ResponseEntity.ok(summaries);
    }

    // Returns full details so the Frontend can build the form dynamically
    @GetMapping("/{id}")
    public ResponseEntity<TemplateRequestDTO> getTemplateDetails(@PathVariable Long id) {
        DocumentTemplate template = templateRepository.findById(id)
                .filter(DocumentTemplate::isActive)
                .orElseThrow(() -> new RuntimeException("Template not found or inactive"));

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

        TemplateRequestDTO response = TemplateRequestDTO.builder()
                .name(template.getName())
                .description(template.getDescription())
                // ContentHtml isn't strictly needed for the form, but useful for previewing
                .contentHtml(template.getContentHtml())
                .active(template.isActive())
                .fields(fieldDtos)
                .build();

        return ResponseEntity.ok(response);
    }
}
```

######
docugen-frontend/package.json
######

```
{
  "name": "docugen-frontend",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "prettier": {
    "printWidth": 100,
    "singleQuote": true,
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "parser": "angular"
        }
      }
    ]
  },
  "private": true,
  "packageManager": "npm@11.6.3",
  "dependencies": {
    "@angular/cdk": "^21.0.2",
    "@angular/common": "^21.0.0",
    "@angular/compiler": "^21.0.0",
    "@angular/core": "^21.0.0",
    "@angular/forms": "^21.0.0",
    "@angular/material": "^21.0.2",
    "@angular/platform-browser": "^21.0.0",
    "@angular/router": "^21.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular/build": "^21.0.1",
    "@angular/cli": "^21.0.1",
    "@angular/compiler-cli": "^21.0.0",
    "autoprefixer": "^10.4.22",
    "jsdom": "^27.1.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.18",
    "typescript": "~5.9.2",
    "vitest": "^4.0.8"
  }
}

```

######
DocuGen Pro/src/main/resources/templates/freelance.html
######

```
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <style>
        body { font-family: sans-serif; }
        h1 { color: #2c3e50; }
        .section { margin-bottom: 20px; }
        .signature { margin-top: 50px; border-top: 1px solid black; width: 40%; padding-top: 10px; }
    </style>
</head>
<body>
<h1>Freelance Service Agreement</h1>
<p><strong>Date:</strong> <span th:text="${#temporals.format(now, 'yyyy-MM-dd')}">2023-01-01</span></p>

<div class="section">
    <h3>1. Parties</h3>
    <p>This agreement is between <strong><span th:text="${freelancerName}">Freelancer</span></strong> and <strong><span th:text="${clientName}">Client</span></strong>.</p>
</div>

<div class="section">
    <h3>2. Services</h3>
    <p>The Freelancer agrees to provide: <span th:text="${serviceDescription}">Dev Services</span>.</p>
</div>

<div class="section">
    <h3>3. Payment</h3>
    <p>Total Amount: <strong>$<span th:text="${paymentAmount}">1000</span></strong>.</p>
</div>

<div class="section" th:if="${includeNDA}">
    <h3>4. Confidentiality (NDA)</h3>
    <p>The Freelancer acknowledges that they may have access to proprietary information. They agree to keep all such information confidential.</p>
</div>

<div class="signature">
    Signature (Freelancer)
</div>
</body>
</html>
```

######
DocuGen Pro/src/main/java/com/docugen/security/JwtAuthenticationFilter.java
######

```
package com.docugen.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
```

######
DocuGen Pro/src/main/resources/templates/lease.html
######

```
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <style>
        body { font-family: serif; }
        h1 { text-align: center; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px; border: 1px solid #ddd; }
    </style>
</head>
<body>
<h1>Residential Lease Agreement</h1>

<h3>Property Details</h3>
<table>
    <tr>
        <td><strong>Address:</strong></td>
        <td th:text="${propertyAddress}">123 Main St</td>
    </tr>
    <tr>
        <td><strong>Landlord:</strong></td>
        <td th:text="${landlordName}">John Doe</td>
    </tr>
    <tr>
        <td><strong>Tenant:</strong></td>
        <td th:text="${tenantName}">Jane Doe</td>
    </tr>
</table>

<h3>Term</h3>
<p>The lease begins on <span th:text="${startDate}">2023-01-01</span> and ends on <span th:text="${endDate}">2024-01-01</span>.</p>

<h3>Rent</h3>
<p>The tenant agrees to pay the amount of <strong>$<span th:text="${paymentAmount}">1200</span></strong> per month.</p>

</body>
</html>
```

######
DocuGen Pro/src/main/java/com/docugen/config/ApplicationConfig.java
######

```
package com.docugen.config;

import com.docugen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .map(user -> new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        java.util.Collections.singleton(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
                ))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

######
docugen-frontend/src/custom-theme.scss
######

```

// Include theming for Angular Material with `mat.theme()`.
// This Sass mixin will define CSS variables that are used for styling Angular Material
// components according to the Material 3 design spec.
// Learn more about theming and how to use it for your application's
// custom components at https://material.angular.dev/guide/theming
@use '@angular/material' as mat;

html {
  @include mat.theme((
    color: (
      primary: mat.$rose-palette,
      tertiary: mat.$red-palette,
    ),
    typography: Roboto,
    density: 0,
  ));
}

body {
  // Default the application to a light color theme. This can be changed to
  // `dark` to enable the dark color theme, or to `light dark` to defer to the
  // user's system settings.
  color-scheme: light;

  // Set a default background, font and text colors for the application using
  // Angular Material's system-level CSS variables. Learn more about these
  // variables at https://material.angular.dev/guide/system-variables
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  font: var(--mat-sys-body-medium);

  // Reset the user agent margin.
  margin: 0;
}

```

######
docugen-frontend/src/app/features/dashboard/dashboard.component.ts
######

```
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DocumentService } from '../../core/service/document';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private docService = inject(DocumentService);
  private router = inject(Router);

  templates: any[] = [];
  loading = true;

  ngOnInit() {
    this.docService.getTemplates().subscribe({
      next: (data) => {
        this.templates = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching templates', err);
        this.loading = false;
      }
    });
  }

  openTemplate(id: number) {
    this.router.navigate(['/document', id]);
  }
}

```

######
docugen-frontend/src/app/features/auth/register.component/register.component.ts
######

```
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/service/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage: string = '';

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = 'Registration failed. Email might be in use.';
        }
      });
    }
  }
}

```

######
docugen-frontend/src/app/features/auth/login.component/login.component.ts
######

```
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  errorMessage: string = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = 'Invalid email or password';
          console.error(err);
        }
      });
    }
  }
}

```

######
docugen-frontend/src/app/features/dashboard/dashboard.component.css
######

```
.dashboard-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.doc-card {
  width: 100%;
  max-width: 600px;
  padding: 1rem;
}

.full-width {
  width: 100%;
}

.row {
  display: flex;
  gap: 1rem;
}

.row mat-form-field {
  flex: 1;
}

.divider {
  margin: 1.5rem 0;
  border-bottom: 1px solid #e0e0e0;
}

.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

h3 {
  color: #3f51b5; /* Primary Material Color */
  margin-bottom: 1rem;
}

/* Animations for smooth toggling */
.dynamic-section {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

```

######
docugen-frontend/src/app/features/auth/register.component/register.component.html
######

```
<div class="auth-container">
  <h2>Create Account</h2>

  <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label for="fullName">Full Name</label>
      <input id="fullName" type="text" formControlName="fullName" placeholder="John Doe">
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email" placeholder="user@example.com">
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" type="password" formControlName="password" placeholder="Min 6 characters">
    </div>

    <div *ngIf="errorMessage" class="error-banner">
      {{ errorMessage }}
    </div>

    <button type="submit" [disabled]="registerForm.invalid">Sign Up</button>
  </form>

  <p>Already have an account? <a routerLink="/login">Login here</a></p>
</div>

```

######
docugen-frontend/src/app/app.html
######

```
<mat-toolbar color="primary" class="navbar">
  <button mat-icon-button class="menu-icon" aria-label="Menu icon">
    <mat-icon>description</mat-icon>
  </button>

  <span class="logo" routerLink="/">DocuGen Pro</span>

  <span class="spacer"></span>

  <div *ngIf="!isLoggedIn" class="nav-buttons">
    <button mat-button routerLink="/login">Login</button>
    <button mat-raised-button color="accent" routerLink="/register">Get Started</button>
  </div>

<div *ngIf="isLoggedIn" class="nav-buttons">
    <button mat-button routerLink="/admin/builder">
        <mat-icon>build</mat-icon> Builder
    </button>

    <button mat-button routerLink="/dashboard">
      <mat-icon>dashboard</mat-icon> Dashboard
    </button>
    <button mat-icon-button (click)="logout()" title="Logout">
      <mat-icon>logout</mat-icon>
    </button>
  </div>
</mat-toolbar>

<div class="main-container">
  <router-outlet></router-outlet>
</div>

```

######
docugen-frontend/src/app/app.routes.ts
######

```
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component/login.component';
import { RegisterComponent } from './features/auth/register.component/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guard/auth-guard';
import { adminGuard } from './core/guard/admin-guard';
import { TemplateBuilderComponent } from './features/admin/template-builder.component/template-builder.component';
import { DynamicDocumentFormComponent } from './features/dashboard/dynamic-document-form.component/dynamic-document-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/builder',
    component: TemplateBuilderComponent,
    canActivate: [adminGuard] // Now properly restricted to admins only
  },
  {
    path: 'document/:id',
    component: DynamicDocumentFormComponent,
    canActivate: [authGuard]
  }
];

```

######
docugen-frontend/src/app/features/auth/login.component/login.component.html
######

```
<div class="auth-container">
  <h2>Login to DocuGen Pro</h2>

  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email" placeholder="Enter your email">
      <div *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.invalid" class="error">
        Valid email is required
      </div>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" type="password" formControlName="password" placeholder="Enter your password">
    </div>

    <div *ngIf="errorMessage" class="error-banner">
      {{ errorMessage }}
    </div>

    <button type="submit" [disabled]="loginForm.invalid">Login</button>
  </form>

  <p>Don't have an account? <a routerLink="/register">Register here</a></p>
</div>

```

######
DocuGen Pro/src/main/java/com/docugen/service/EmailService.java
######

```
package com.docugen.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendEmailWithAttachment(String to, String subject, String body, byte[] pdfBytes, String filename) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            // multipart = true for attachments
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body);

            // Add Attachment
            helper.addAttachment(filename, new ByteArrayResource(pdfBytes));

            mailSender.send(message);
        } catch (MessagingException e) {
            // Log error in real app
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
```

######
DocuGen Pro/src/main/java/com/docugen/entity/DocumentTemplate.java
######

```
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
```

######
docugen-frontend/src/app/core/service/document.ts
######

```
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl; // Base API URL

  generateDocument(data: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/documents/generate`, data, { responseType: 'text' });
  }

  // FIX: Corrected endpoint from /documents/admin to /admin
  createTemplate(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/templates`, data);
  }

  // FIX: Corrected endpoint
  getTemplateById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/templates/${id}`);
  }

  // FIX: Corrected endpoint
  getTemplates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/templates`);
  }
}

```

######
DocuGen Pro/src/main/java/com/docugen/entity/User.java
######

```
package com.docugen.entity;

import com.docugen.model.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @Email
    @NotBlank
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "full_name")
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // Optional: Bidirectional mapping (useful for retrieving all docs by a user)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DocumentRequest> documentRequests;
}
```

######
DocuGen Pro/src/main/java/com/docugen/config/DataSeeder.java
######

```
package com.docugen.config;

import com.docugen.entity.User;
import com.docugen.model.Role;
import com.docugen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail("admin@docugen.com")) {
            User admin = User.builder()
                    .fullName("System Administrator")
                    .email("admin@docugen.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.ADMIN)
                    .build();

            userRepository.save(admin);
            System.out.println("✅ ADMIN USER SEEDED: admin@docugen.com / password123");
        } else {
            System.out.println("ℹ️ Admin user already exists.");
        }
    }
}
```

######
DocuGen Pro/src/main/java/com/docugen/service/PdfService.java
######

```
package com.docugen.service;

import com.lowagie.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PdfService {

    @Autowired
    private TemplateEngine templateEngine;

    public byte[] generatePdf(String templateName, Context context) throws DocumentException, IOException {
        // 1. Render HTML from Thymeleaf template
        String htmlContent = templateEngine.process(templateName, context);

        // 2. Create PDF from HTML using Flying Saucer (OpenPDF backend)
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ITextRenderer renderer = new ITextRenderer();

        // Ensure the HTML is parsed correctly
        renderer.setDocumentFromString(htmlContent);
        renderer.layout();
        renderer.createPDF(outputStream);

        return outputStream.toByteArray();
    }
}
```

######
DocuGen Pro/src/main/java/com/docugen/entity/FormField.java
######

```
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
```

######
DocuGen Pro/src/main/resources/application.properties
######

```
spring.application.name=DocuGen Pro

# --- DATABASE ---
spring.datasource.url=jdbc:postgresql://localhost:5432/docugen_db
spring.datasource.username=postgres
# CHANGE THIS TO YOUR REAL POSTGRES PASSWORD
spring.datasource.password=
spring.datasource.driver-class-name=org.postgresql.Driver

# --- JPA ---
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# --- MAIL (DUMMY CONFIG - WILL FAIL SILENTLY OR LOG ERROR) ---
# If you don't have a real SMTP server, the app will try to connect and time out.
# For testing, you can leave this, but the "Send Email" step will be slow and fail.
spring.mail.host=localhost
spring.mail.port=1025
spring.mail.username=
spring.mail.password=
spring.mail.properties.mail.smtp.auth=false
spring.mail.properties.mail.smtp.starttls.enable=false
```

######
DocuGen Pro/src/main/java/com/docugen/entity/DocumentRequest.java
######

```
package com.docugen.entity;

import com.docugen.model.DocumentType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "document_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DocumentType type;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Email
    @Column(name = "recipient_email")
    private String recipientEmail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
```

######
DocuGen Pro/src/main/java/com/docugen/config/ThymeleafConfig.java
######

```
package com.docugen.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.StringTemplateResolver;

@Configuration
public class ThymeleafConfig {

    @Bean
    public TemplateEngine stringTemplateEngine() {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.addTemplateResolver(stringTemplateResolver());
        return templateEngine;
    }

    private StringTemplateResolver stringTemplateResolver() {
        StringTemplateResolver resolver = new StringTemplateResolver();
        resolver.setTemplateMode(TemplateMode.HTML);
        resolver.setCacheable(false); // Dynamic content shouldn't be cached
        return resolver;
    }
}
```

######
docugen-frontend/src/app/app.css
######

```
/* Ensure the app takes full height */
:host {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Push navigation buttons to the far right */
.spacer {
  flex: 1 1 auto;
}

.logo {
  font-weight: 500;
  margin-left: 8px;
  cursor: pointer;
  letter-spacing: 0.5px;
}

.nav-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* Container for the page content */
.main-container {
  padding: 20px;
  flex: 1; /* Fills remaining space below toolbar */
  background-color: #f5f5f5; /* Light gray background for contrast */
  overflow-y: auto; /* Allow scrolling */
}

```

######
docugen-frontend/src/index.html
######

```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>DocugenFrontend</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
</body>
</html>

```

######
docugen-frontend/src/app/app.spec.ts
######

```
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, docugen-frontend');
  });
});

```

######
docugen-frontend/src/styles.css
######

```
/* @import rules must come FIRST, before any other CSS rules or Tailwind directives */
@import '@angular/material/prebuilt-themes/indigo-pink.css';

/* 1. Tailwind Directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 3. Global Resets & Typography */
html, body {
    height: 100%;
}
body {
    margin: 0;
    font-family: Roboto, "Helvetica Neue", sans-serif;
    background-color: #f3f4f6;
}

/* 4. Utility Classes */
.mat-mdc-card {
    background-color: white;
}

```

######
DocuGen Pro/src/main/java/com/docugen/dto/DocumentDataDTO.java
######

```
package com.docugen.dto;

import com.docugen.model.DocumentType;
import lombok.Data;

@Data
public class DocumentDataDTO {
    private DocumentType type;
    private String recipientEmail;

    // Freelance Specific
    private String clientName;
    private String freelancerName; // Usually the User's name, but can be overridden
    private Double paymentAmount;
    private String serviceDescription;
    private boolean includeNDA;

    // Lease Specific
    private String landlordName;
    private String tenantName;
    private String propertyAddress;
    private String startDate; // String for simplicity in templates
    private String endDate;
}
```

######
docugen-frontend/src/app/features/dashboard/dynamic-document-form.component/dynamic-document-form.component.spec.ts
######

```
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDocumentFormComponent } from './dynamic-document-form.component';

describe('DynamicDocumentFormComponent', () => {
  let component: DynamicDocumentFormComponent;
  let fixture: ComponentFixture<DynamicDocumentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicDocumentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicDocumentFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

######
docugen-frontend/src/app/features/admin/template-builder.component/template-builder.component.spec.ts
######

```
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateBuilderComponent } from './template-builder.component';

describe('TemplateBuilderComponent', () => {
  let component: TemplateBuilderComponent;
  let fixture: ComponentFixture<TemplateBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateBuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateBuilderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

######
docugen-frontend/src/app/features/dashboard/dashboard.component.spec.ts
######

```
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

######
docugen-frontend/src/app/features/auth/register.component/register.component.spec.ts
######

```
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

######
docugen-frontend/src/app/app.config.ts
######

```
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// 1. Import these:
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptor/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // 2. Add the HTTP Client provider with the interceptor
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};

```

######
docugen-frontend/src/app/features/auth/login.component/login.component.spec.ts
######

```
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

######
docugen-frontend/src/app/core/interceptor/auth-interceptor.spec.ts
######

```
import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { authInterceptor } from './auth-interceptor';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});

```

######
docugen-frontend/src/app/core/guard/auth-guard.spec.ts
######

```
import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth-guard';


describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

```

######
DocuGen Pro/src/main/java/com/docugen/dto/FormFieldDTO.java
######

```
package com.docugen.dto;

import com.docugen.model.FieldType;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormFieldDTO {
    private Long id; // Null on create
    @NotBlank
    private String label;
    @NotBlank
    private String variableName;
    private FieldType type;
    private String options;
    private int ordering;
}
```

######
docugen-frontend/src/app/core/guard/auth-guard.ts
######

```
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

```

######
DocuGen Pro/src/main/java/com/docugen/dto/TemplateRequestDTO.java
######

```
package com.docugen.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateRequestDTO {
    @NotBlank
    private String name;
    private String description;
    @NotBlank
    private String contentHtml;
    private boolean active;
    private List<FormFieldDTO> fields;
}
```

######
docugen-frontend/src/app/core/interceptor/auth-interceptor.ts
######

```
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};

```

######
docugen-frontend/src/app/core/service/auth.spec.ts
######

```
import { TestBed } from '@angular/core/testing';

import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

```

######
docugen-frontend/src/app/core/service/document.spec.ts
######

```
import { TestBed } from '@angular/core/testing';

import { Document } from './document';

describe('Document', () => {
  let service: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Document);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

```

######
DocuGen Pro/src/main/java/com/docugen/repository/UserRepository.java
######

```
package com.docugen.repository;

import com.docugen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
```

######
DocuGen Pro/src/main/java/com/docugen/dto/TemplateSummaryDTO.java
######

```
package com.docugen.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// Lightweight DTO for list views
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateSummaryDTO {
    private Long id;
    private String name;
    private String description;
}
```

######
DocuGen Pro/src/main/java/com/docugen/repository/DocumentRequestRepository.java
######

```
package com.docugen.repository;

import com.docugen.entity.DocumentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRequestRepository extends JpaRepository<DocumentRequest, Long> {
    List<DocumentRequest> findByUserId(Long userId);
}
```

######
DocuGen Pro/src/main/java/com/docugen/repository/DocumentTemplateRepository.java
######

```
package com.docugen.repository;

import com.docugen.entity.DocumentTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentTemplateRepository extends JpaRepository<DocumentTemplate, Long> {
    List<DocumentTemplate> findByActiveTrue();
}
```

######
DocuGen Pro/src/main/java/com/docugen/DocuGenProApplication.java
######

```
package com.docugen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DocuGenProApplication {

	public static void main(String[] args) {
		SpringApplication.run(DocuGenProApplication.class, args);
	}

}

```

######
DocuGen Pro/src/main/java/com/docugen/dto/RegisterRequest.java
######

```
package com.docugen.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
}
```

######
docugen-frontend/src/main.ts
######

```
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

```

######
DocuGen Pro/src/main/java/com/docugen/dto/LoginRequest.java
######

```
package com.docugen.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
}
```

######
DocuGen Pro/src/main/java/com/docugen/dto/AuthResponse.java
######

```
package com.docugen.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
}
```

######
docugen-frontend/src/app/features/dashboard/dynamic-document-form.component/dynamic-document-form.component.css
######

```
.font-cursive {
  font-family: 'Brush Script MT', cursive;
  font-size: 1.2rem;
  color: #1a237e;
}

```

######
DocuGen Pro/src/main/java/com/docugen/model/FieldType.java
######

```
package com.docugen.model;

public enum FieldType {
    TEXT,
    NUMBER,
    DATE,
    SELECT,
    CHECKBOX,
    SIGNATURE
}
```

######
DocuGen Pro/src/main/java/com/docugen/model/DocumentType.java
######

```
package com.docugen.model;

public enum DocumentType {
    FREELANCE_CONTRACT,
    RESIDENTIAL_LEASE
}

```

######
docugen-frontend/src/environments/environment.development.ts
######

```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};

```

######
docugen-frontend/src/environments/environment.ts
######

```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};

```

######
DocuGen Pro/src/main/java/com/docugen/model/Role.java
######

```
package com.docugen.model;

public enum Role {
    USER,
    ADMIN
}
```

######
docugen-frontend/src/app/features/admin/template-builder.component/template-builder.component.css
######

```

```

######
docugen-frontend/src/app/features/auth/login.component/login.component.css
######

```

```

######
docugen-frontend/src/app/features/auth/register.component/register.component.css
######

```

```


--END--
