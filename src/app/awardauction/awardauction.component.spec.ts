import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AwardauctionComponent } from './awardauction.component';

describe('AwardauctionComponent', () => {
  let component: AwardauctionComponent;
  let fixture: ComponentFixture<AwardauctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardauctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
