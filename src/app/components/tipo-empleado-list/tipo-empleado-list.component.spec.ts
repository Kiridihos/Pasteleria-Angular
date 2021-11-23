import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEmpleadoListComponent } from './tipo-empleado-list.component';

describe('TipoEmpleadoListComponent', () => {
  let component: TipoEmpleadoListComponent;
  let fixture: ComponentFixture<TipoEmpleadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEmpleadoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEmpleadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
