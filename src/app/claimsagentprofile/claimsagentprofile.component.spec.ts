import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsagentprofileComponent } from './claimsagentprofile.component';

describe('ClaimsagentprofileComponent', () => {
  let component: ClaimsagentprofileComponent;
  let fixture: ComponentFixture<ClaimsagentprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsagentprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsagentprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
