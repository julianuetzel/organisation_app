import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DailyTodoComponent } from './daily-todo/daily-todo.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FinancesComponent } from './finances/finances.component';
import { FoodDiaryComponent } from './food-diary/food-diary.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { MoodComponent } from './mood/mood.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { WeeklyTodoComponent } from './weekly-todo/weekly-todo.component';


const routes: Routes = [
  {path: 'daily-todo', component: DailyTodoComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'finances', component: FinancesComponent},
  {path: 'food-diary', component: FoodDiaryComponent},
  {path: 'hobbies', component: HobbiesComponent},
  {path: 'mood', component: MoodComponent},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'weekly-todo', component: WeeklyTodoComponent},
  {path: '', redirectTo: '', pathMatch: 'full'},
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
