import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisPopinComponent } from './avis-popin.component';

describe('AvisPopinComponent', () => {
  let component: AvisPopinComponent;
  let fixture: ComponentFixture<AvisPopinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvisPopinComponent]
    });
    fixture = TestBed.createComponent(AvisPopinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
