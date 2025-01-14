import { TestBed } from '@angular/core/testing';

import { XgBoostModelService } from './xg-boost-model.service';

describe('XgBoostModelService', () => {
  let service: XgBoostModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XgBoostModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
