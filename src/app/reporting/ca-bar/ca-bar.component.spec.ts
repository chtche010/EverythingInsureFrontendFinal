import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaBarComponent } from './ca-bar.component';

describe('CaBarComponent', () => {
  let component: CaBarComponent;
  let fixture: ComponentFixture<CaBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
