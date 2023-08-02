import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaProfileComponent } from './ca-profile.component';

describe('CaProfileComponent', () => {
  let component: CaProfileComponent;
  let fixture: ComponentFixture<CaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
