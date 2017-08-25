import { TestBed, async, inject } from '@angular/core/testing';

import { SnippetResolverGuard } from './snippet-resolver.guard';

describe('SnippetResolverGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnippetResolverGuard]
    });
  });

  it('should ...', inject([SnippetResolverGuard], (guard: SnippetResolverGuard) => {
    expect(guard).toBeTruthy();
  }));
});
