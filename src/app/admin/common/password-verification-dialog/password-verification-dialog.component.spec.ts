import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordVerificationDialogComponent } from './password-verification-dialog.component';

describe('PasswordVerificationDialogComponent', () => {
  let component: PasswordVerificationDialogComponent;
  let fixture: ComponentFixture<PasswordVerificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordVerificationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordVerificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
