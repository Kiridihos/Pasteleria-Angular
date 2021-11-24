import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastelListComponent } from './pastel-list.component';

describe('PastelListComponent', () => {
  let component: PastelListComponent;
  let fixture: ComponentFixture<PastelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
