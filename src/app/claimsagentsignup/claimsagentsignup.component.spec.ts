import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsagentsignupComponent } from './claimsagentsignup.component';

describe('ClaimsagentsignupComponent', () => {
  let component: ClaimsagentsignupComponent;
  let fixture: ComponentFixture<ClaimsagentsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsagentsignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsagentsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
