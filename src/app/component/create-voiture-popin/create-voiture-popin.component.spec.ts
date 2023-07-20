import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVoiturePopinComponent } from './create-voiture-popin.component';

describe('CreateVoiturePopinComponent', () => {
  let component: CreateVoiturePopinComponent;
  let fixture: ComponentFixture<CreateVoiturePopinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVoiturePopinComponent]
    });
    fixture = TestBed.createComponent(CreateVoiturePopinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
