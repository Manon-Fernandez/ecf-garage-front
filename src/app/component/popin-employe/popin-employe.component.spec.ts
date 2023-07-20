import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopinEmployeComponent } from './popin-employe.component';

describe('PopinEmployeComponent', () => {
  let component: PopinEmployeComponent;
  let fixture: ComponentFixture<PopinEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopinEmployeComponent]
    });
    fixture = TestBed.createComponent(PopinEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
