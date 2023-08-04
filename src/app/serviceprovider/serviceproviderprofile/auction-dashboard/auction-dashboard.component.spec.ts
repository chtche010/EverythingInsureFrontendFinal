import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionDashboardComponent } from './auction-dashboard.component';

describe('AuctionDashboardComponent', () => {
  let component: AuctionDashboardComponent;
  let fixture: ComponentFixture<AuctionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
