import { TestBed } from '@angular/core/testing';

import { PqFormUploadService } from './pq-form-upload.service';

describe('PqFormUploadService', () => {
  let service: PqFormUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PqFormUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
