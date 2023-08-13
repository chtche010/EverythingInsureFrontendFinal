import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EverythingauctionComponent } from './everythingauction.component';

describe('EverythingauctionComponent', () => {
  let component: EverythingauctionComponent;
  let fixture: ComponentFixture<EverythingauctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EverythingauctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EverythingauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
