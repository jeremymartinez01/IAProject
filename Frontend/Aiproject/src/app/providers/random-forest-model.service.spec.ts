import { TestBed } from '@angular/core/testing';

import { RandomForestModelService } from './random-forest-model.service';

describe('RandomForestModelService', () => {
  let service: RandomForestModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomForestModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
