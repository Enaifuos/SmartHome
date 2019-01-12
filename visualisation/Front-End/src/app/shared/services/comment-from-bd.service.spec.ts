import { TestBed, inject } from '@angular/core/testing';

import { CommentFromBdService } from './comment-from-bd.service';

describe('CommentFromBdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentFromBdService]
    });
  });

  it('should be created', inject([CommentFromBdService], (service: CommentFromBdService) => {
    expect(service).toBeTruthy();
  }));
});
