import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileCompletedGuard } from './profile-completed.guard';

describe('ProfileCompletedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileCompletedGuard]
    });
  });

  it('should ...', inject([ProfileCompletedGuard], (guard: ProfileCompletedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
