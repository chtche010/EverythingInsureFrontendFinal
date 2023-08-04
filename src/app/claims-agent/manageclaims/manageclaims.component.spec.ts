import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageclaimsComponent } from './manageclaims.component';

describe('ManageclaimsComponent', () => {
  let component: ManageclaimsComponent;
  let fixture: ComponentFixture<ManageclaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageclaimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageclaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
