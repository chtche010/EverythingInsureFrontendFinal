import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsAgentDashboardComponent } from './claims-agent-dashboard.component';

describe('ClaimsAgentDashboardComponent', () => {
  let component: ClaimsAgentDashboardComponent;
  let fixture: ComponentFixture<ClaimsAgentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsAgentDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimsAgentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
