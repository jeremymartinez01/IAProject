import { TestBed } from '@angular/core/testing';

import { LightGbmModelService } from './light-gbm-model.service';

describe('LightGbmModelService', () => {
  let service: LightGbmModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightGbmModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
