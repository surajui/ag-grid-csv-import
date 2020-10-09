import { TestBed } from '@angular/core/testing';

import { FakeSericeService } from './fake-serice.service';

describe('FakeSericeService', () => {
  let service: FakeSericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeSericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
