import { TestBed, async, inject } from '@angular/core/testing';

import { SnippetsRequestsResolverGuard } from './snippets-requests-resolver.guard';

describe('SnippetsRequestsResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnippetsRequestsResolverGuard]
    });
  });

  it('should ...', inject([SnippetsRequestsResolverGuard], (guard: SnippetsRequestsResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
