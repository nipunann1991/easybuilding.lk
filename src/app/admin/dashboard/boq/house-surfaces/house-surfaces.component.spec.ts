import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSurfacesComponent } from './house-surfaces.component';

describe('HouseSurfacesComponent', () => {
  let component: HouseSurfacesComponent;
  let fixture: ComponentFixture<HouseSurfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseSurfacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseSurfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
