import { TestBed } from '@angular/core/testing';

import { WeeklytodoService } from './weeklytodo.service';

describe('WeeklytodoService', () => {
  let service: WeeklytodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklytodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
