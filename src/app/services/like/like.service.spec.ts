import { TestBed, inject } from '@angular/core/testing';

import { LikeService } from './like.service';

describe('LikeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LikeService]
    });
  });

  it('should ...', inject([LikeService], (service: LikeService) => {
    expect(service).toBeTruthy();
  }));
});
