import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

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
import { DialogComponent as DailyToDoDialog } from './daily-todo/dialog/dialog.component';
import { DialogComponent as WeeklyToDoDialog } from './weekly-todo/dialog/dialog.component';
import { DialogComponent as FinancesDialog } from './finances/dialog/dialog.component';

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
    DailyToDoDialog,
    WeeklyToDoDialog,
    FinancesDialog,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSliderModule,
    MatInputModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HammerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private router: Router){}   
  
}
