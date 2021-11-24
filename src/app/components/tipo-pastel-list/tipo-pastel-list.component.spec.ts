import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPastelListComponent } from './tipo-pastel-list.component';

describe('TipoPastelListComponent', () => {
  let component: TipoPastelListComponent;
  let fixture: ComponentFixture<TipoPastelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPastelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPastelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
