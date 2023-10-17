import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctiondetailsdialogComponent } from './auctiondetailsdialog.component';

describe('AuctiondetailsdialogComponent', () => {
  let component: AuctiondetailsdialogComponent;
  let fixture: ComponentFixture<AuctiondetailsdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctiondetailsdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctiondetailsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
