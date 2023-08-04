import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmanageauctionComponent } from './adminmanageauction.component';

describe('AdminmanageauctionComponent', () => {
  let component: AdminmanageauctionComponent;
  let fixture: ComponentFixture<AdminmanageauctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmanageauctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmanageauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
