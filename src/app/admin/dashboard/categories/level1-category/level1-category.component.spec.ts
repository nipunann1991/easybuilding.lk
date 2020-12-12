import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Level1CategoryComponent } from './level1-category.component';

describe('Level1CategoryComponent', () => {
  let component: Level1CategoryComponent;
  let fixture: ComponentFixture<Level1CategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Level1CategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level1CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
