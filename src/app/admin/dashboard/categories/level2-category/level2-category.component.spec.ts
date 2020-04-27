import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Level2CategoryComponent } from './level2-category.component';

describe('Level2CategoryComponent', () => {
  let component: Level2CategoryComponent;
  let fixture: ComponentFixture<Level2CategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level2CategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
