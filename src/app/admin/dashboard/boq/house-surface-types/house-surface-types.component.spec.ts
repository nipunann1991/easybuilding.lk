import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSurfaceTypesComponent } from './house-surface-types.component';

describe('HouseSurfaceTypesComponent', () => {
  let component: HouseSurfaceTypesComponent;
  let fixture: ComponentFixture<HouseSurfaceTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseSurfaceTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseSurfaceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
