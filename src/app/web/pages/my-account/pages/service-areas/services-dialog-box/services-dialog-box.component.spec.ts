import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesDialogBoxComponent } from './services-dialog-box.component';

describe('ServicesDialogBoxComponent', () => {
  let component: ServicesDialogBoxComponent;
  let fixture: ComponentFixture<ServicesDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesDialogBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
