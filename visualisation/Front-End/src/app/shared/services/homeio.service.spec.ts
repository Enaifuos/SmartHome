import { TestBed, inject } from '@angular/core/testing';

import { HomeioService } from './homeio.service';

describe('HomeioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeioService]
    });
  });

  it('should be created', inject([HomeioService], (service: HomeioService) => {
    expect(service).toBeTruthy();
  }));
});
