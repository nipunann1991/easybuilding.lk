import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfilesComponent } from './client-profiles.component';

describe('ClientProfilesComponent', () => {
  let component: ClientProfilesComponent;
  let fixture: ComponentFixture<ClientProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
