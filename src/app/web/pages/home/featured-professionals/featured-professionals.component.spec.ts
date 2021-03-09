import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProfessionalsComponent } from './featured-professionals.component';

describe('FeaturedProfessionalsComponent', () => {
  let component: FeaturedProfessionalsComponent;
  let fixture: ComponentFixture<FeaturedProfessionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedProfessionalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
