import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalBoxComponent } from './modal-box.component';

describe('ModalBoxComponent', () => {
  let component: ModalBoxComponent;
  let fixture: ComponentFixture<ModalBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
