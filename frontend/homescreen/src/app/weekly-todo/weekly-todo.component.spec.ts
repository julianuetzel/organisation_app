import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTodoComponent } from './weekly-todo.component';

describe('WeeklyTodoComponent', () => {
  let component: WeeklyTodoComponent;
  let fixture: ComponentFixture<WeeklyTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyTodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
