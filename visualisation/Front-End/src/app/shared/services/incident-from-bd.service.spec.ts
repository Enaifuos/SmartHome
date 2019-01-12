import { TestBed, inject } from '@angular/core/testing';

import { IncidentFromBdService } from './incident-from-bd.service';

describe('IncidentFromBdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncidentFromBdService]
    });
  });

  it('should be created', inject([IncidentFromBdService], (service: IncidentFromBdService) => {
    expect(service).toBeTruthy();
  }));
});
