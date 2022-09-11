import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DailyTodoComponent } from './daily-todo/daily-todo.component';
import { AppRoutingModule } from './app-routing.module';
import { FoodDiaryComponent } from './food-diary/food-diary.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { FinancesComponent } from './finances/finances.component';
import { HobbiesComponent } from './hobbies/hobbies.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MoodComponent } from './mood/mood.component';
import { WeeklyTodoComponent } from './weekly-todo/weekly-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyTodoComponent,
    FoodDiaryComponent,
    ShoppingListComponent,
    FinancesComponent,
    HobbiesComponent,
    CalendarComponent,
    MoodComponent,
    WeeklyTodoComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private router: Router){}   
  
}
