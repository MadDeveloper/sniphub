import { TestBed, inject } from '@angular/core/testing';

import { SnippetService } from './snippet.service';

describe('SnippetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnippetService]
    });
  });

  it('should ...', inject([SnippetService], (service: SnippetService) => {
    expect(service).toBeTruthy();
  }));
});
