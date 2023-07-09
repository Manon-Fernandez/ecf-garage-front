import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPopinComponent } from './detail-popin.component';

describe('DetailPopinComponent', () => {
  let component: DetailPopinComponent;
  let fixture: ComponentFixture<DetailPopinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPopinComponent]
    });
    fixture = TestBed.createComponent(DetailPopinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
