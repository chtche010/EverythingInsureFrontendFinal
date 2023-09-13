import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidSelectComponent } from './bid-select.component';

describe('BidSelectComponent', () => {
  let component: BidSelectComponent;
  let fixture: ComponentFixture<BidSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
