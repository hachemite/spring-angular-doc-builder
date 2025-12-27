import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTemplateListComponent } from './admin-template-list.component';

describe('AdminTemplateListComponent', () => {
  let component: AdminTemplateListComponent;
  let fixture: ComponentFixture<AdminTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTemplateListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
