import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVeriComponent } from './email-veri.component';

describe('EmailVeriComponent', () => {
  let component: EmailVeriComponent;
  let fixture: ComponentFixture<EmailVeriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVeriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVeriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
