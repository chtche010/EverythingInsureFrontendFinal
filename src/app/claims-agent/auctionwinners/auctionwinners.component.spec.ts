import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionwinnersComponent } from './auctionwinners.component';

describe('AuctionwinnersComponent', () => {
  let component: AuctionwinnersComponent;
  let fixture: ComponentFixture<AuctionwinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionwinnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionwinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
