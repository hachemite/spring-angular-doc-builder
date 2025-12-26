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
