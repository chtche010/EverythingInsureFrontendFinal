import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpReportDashComponent } from './sp-report-dash.component';

describe('SpReportDashComponent', () => {
  let component: SpReportDashComponent;
  let fixture: ComponentFixture<SpReportDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpReportDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpReportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
