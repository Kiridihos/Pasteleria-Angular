import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEmpleadoFormComponent } from './tipo-empleado-form.component';

describe('TipoEmpleadoFormComponent', () => {
  let component: TipoEmpleadoFormComponent;
  let fixture: ComponentFixture<TipoEmpleadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEmpleadoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEmpleadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
