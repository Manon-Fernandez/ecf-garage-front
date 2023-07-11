import { TestBed } from '@angular/core/testing';

import { GarageServiceService } from './garage-service.service';

describe('GarageServiceService', () => {
  let service: GarageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
