import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPastelFormComponent } from './tipo-pastel-form.component';

describe('TipoPastelFormComponent', () => {
  let component: TipoPastelFormComponent;
  let fixture: ComponentFixture<TipoPastelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPastelFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPastelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
