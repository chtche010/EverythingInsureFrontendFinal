import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagespComponent } from './managesp.component';

describe('ManagespComponent', () => {
  let component: ManagespComponent;
  let fixture: ComponentFixture<ManagespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagespComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
