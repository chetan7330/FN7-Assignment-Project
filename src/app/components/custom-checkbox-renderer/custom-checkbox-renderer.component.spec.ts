import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCheckboxRendererComponent } from './custom-checkbox-renderer.component';

describe('CustomCheckboxRendererComponent', () => {
  let component: CustomCheckboxRendererComponent;
  let fixture: ComponentFixture<CustomCheckboxRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCheckboxRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCheckboxRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
