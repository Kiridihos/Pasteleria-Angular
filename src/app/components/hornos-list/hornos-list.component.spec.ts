import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HornosListComponent } from './hornos-list.component';

describe('HornosListComponent', () => {
  let component: HornosListComponent;
  let fixture: ComponentFixture<HornosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HornosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HornosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
