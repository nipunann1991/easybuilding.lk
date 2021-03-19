import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAreasComponent } from './house-areas.component';

describe('HouseAreasComponent', () => {
  let component: HouseAreasComponent;
  let fixture: ComponentFixture<HouseAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
