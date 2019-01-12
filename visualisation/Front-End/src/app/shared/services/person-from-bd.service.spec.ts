import { TestBed, inject } from '@angular/core/testing';

import { PersonFromBdService } from './person-from-bd.service';

describe('PersonFromBdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonFromBdService]
    });
  });

  it('should be created', inject([PersonFromBdService], (service: PersonFromBdService) => {
    expect(service).toBeTruthy();
  }));
});
