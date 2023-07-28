import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderprofileComponent } from './serviceproviderprofile.component';

describe('ServiceproviderprofileComponent', () => {
  let component: ServiceproviderprofileComponent;
  let fixture: ComponentFixture<ServiceproviderprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceproviderprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceproviderprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
