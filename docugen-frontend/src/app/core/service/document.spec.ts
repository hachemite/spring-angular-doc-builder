import { TestBed } from '@angular/core/testing';

import { Document } from './document';

describe('Document', () => {
  let service: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Document);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
