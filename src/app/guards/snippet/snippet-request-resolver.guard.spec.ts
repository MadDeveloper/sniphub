import { TestBed, async, inject } from '@angular/core/testing';

import { SnippetRequestResolverGuard } from './snippet-request-resolver.guard';

describe('SnippetRequestResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnippetRequestResolverGuard]
    });
  });

  it('should ...', inject([SnippetRequestResolverGuard], (guard: SnippetRequestResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
