import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaSidebarComponent } from './ca-sidebar.component';

describe('CaSidebarComponent', () => {
  let component: CaSidebarComponent;
  let fixture: ComponentFixture<CaSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
