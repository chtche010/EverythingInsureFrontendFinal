import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialsignupComponent } from './initialsignup.component';

describe('InitialsignupComponent', () => {
  let component: InitialsignupComponent;
  let fixture: ComponentFixture<InitialsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialsignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
