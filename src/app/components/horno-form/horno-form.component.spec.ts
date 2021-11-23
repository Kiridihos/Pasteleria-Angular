import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HornoFormComponent } from './horno-form.component';

describe('HornoFormComponent', () => {
  let component: HornoFormComponent;
  let fixture: ComponentFixture<HornoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HornoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HornoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
