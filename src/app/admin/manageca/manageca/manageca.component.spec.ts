import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecaComponent } from './manageca.component';

describe('ManagecaComponent', () => {
  let component: ManagecaComponent;
  let fixture: ComponentFixture<ManagecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagecaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
