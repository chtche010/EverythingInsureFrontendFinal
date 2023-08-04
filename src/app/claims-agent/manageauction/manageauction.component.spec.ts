import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageauctionComponent } from './manageauction.component';

describe('ManageauctionComponent', () => {
  let component: ManageauctionComponent;
  let fixture: ComponentFixture<ManageauctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageauctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
