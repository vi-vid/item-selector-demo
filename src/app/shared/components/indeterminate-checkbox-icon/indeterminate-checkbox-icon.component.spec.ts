import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndeterminateCheckboxIconComponent } from './indeterminate-checkbox-icon.component';

describe('IndeterminateCheckboxIconComponent', () => {
  let component: IndeterminateCheckboxIconComponent;
  let fixture: ComponentFixture<IndeterminateCheckboxIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndeterminateCheckboxIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndeterminateCheckboxIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
