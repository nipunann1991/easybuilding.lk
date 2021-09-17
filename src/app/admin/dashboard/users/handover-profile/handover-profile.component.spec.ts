import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandoverProfileComponent } from './handover-profile.component';

describe('HandoverProfileComponent', () => {
  let component: HandoverProfileComponent;
  let fixture: ComponentFixture<HandoverProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandoverProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandoverProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
