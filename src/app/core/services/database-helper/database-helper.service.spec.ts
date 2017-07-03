import { TestBed, inject } from '@angular/core/testing';

import { DatabaseHelperService } from './database-helper.service';

describe('DatabaseHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseHelperService]
    });
  });

  it('should be created', inject([DatabaseHelperService], (service: DatabaseHelperService) => {
    expect(service).toBeTruthy();
  }));
});
