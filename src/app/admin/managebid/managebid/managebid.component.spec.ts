import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebidComponent } from './managebid.component';

describe('ManagebidComponent', () => {
  let component: ManagebidComponent;
  let fixture: ComponentFixture<ManagebidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagebidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagebidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
