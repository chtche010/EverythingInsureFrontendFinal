import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaReportDashComponent } from './ca-report-dash.component';

describe('CaReportDashComponent', () => {
  let component: CaReportDashComponent;
  let fixture: ComponentFixture<CaReportDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaReportDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaReportDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
