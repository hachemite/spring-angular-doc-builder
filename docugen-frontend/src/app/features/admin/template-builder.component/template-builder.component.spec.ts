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
