import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTodoComponent } from './daily-todo.component';

describe('DailyTodoComponent', () => {
  let component: DailyTodoComponent;
  let fixture: ComponentFixture<DailyTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyTodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
