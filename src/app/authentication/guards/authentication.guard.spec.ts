import { TestBed, async, inject } from '@angular/core/testing'

import { AuthenticationGuard } from './authentication-guard.guard'

describe('AuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationGuard]
    });
  })

  it('should ...', inject([AuthenticationGuard], (guard: AuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }))
})