import { TestBed } from '@angular/core/testing';

import { DailyTodoService } from './daily-todo.service';

describe('DailyTodoService', () => {
  let service: DailyTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
