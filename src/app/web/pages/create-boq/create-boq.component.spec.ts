import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoqComponent } from './create-boq.component';

describe('CreateBoqComponent', () => {
  let component: CreateBoqComponent;
  let fixture: ComponentFixture<CreateBoqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBoqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBoqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
