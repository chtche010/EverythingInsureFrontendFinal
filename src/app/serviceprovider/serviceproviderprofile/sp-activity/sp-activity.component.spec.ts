import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpActivityComponent } from './sp-activity.component';

describe('SpActivityComponent', () => {
  let component: SpActivityComponent;
  let fixture: ComponentFixture<SpActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
