import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasteleroslistComponent } from './pasteleroslist.component';

describe('PasteleroslistComponent', () => {
  let component: PasteleroslistComponent;
  let fixture: ComponentFixture<PasteleroslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasteleroslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasteleroslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
