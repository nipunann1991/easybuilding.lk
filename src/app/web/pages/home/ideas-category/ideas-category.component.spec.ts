import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasCategoryComponent } from './ideas-category.component';

describe('IdeasCategoryComponent', () => {
  let component: IdeasCategoryComponent;
  let fixture: ComponentFixture<IdeasCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeasCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
