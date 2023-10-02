import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteAuctionComponent } from './favourite-auction.component';

describe('FavouriteAuctionComponent', () => {
  let component: FavouriteAuctionComponent;
  let fixture: ComponentFixture<FavouriteAuctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteAuctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
