import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateauctionComponent } from './updateauction.component';

describe('UpdateauctionComponent', () => {
  let component: UpdateauctionComponent;
  let fixture: ComponentFixture<UpdateauctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateauctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
