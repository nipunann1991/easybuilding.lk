import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedPhotosListComponent } from './uploaded-photos-list.component';

describe('UploadedPhotosListComponent', () => {
  let component: UploadedPhotosListComponent;
  let fixture: ComponentFixture<UploadedPhotosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedPhotosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedPhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
