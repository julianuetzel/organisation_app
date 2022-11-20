import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData{
  task: string,
  done_by: string,
}

interface Day {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  
  selectedDay: Day | undefined;
  days: Day[] = [
    {value: 'day1', viewValue: 'Montag'},
    {value: 'day2', viewValue: 'Dienstag'},
    {value: 'day3', viewValue: 'Mittwoch'}, 
    {value: 'day4', viewValue: 'Donnerstag'}, 
    {value: 'day5', viewValue: 'Freitag'}, 
    {value: 'day6', viewValue: 'Samstag'},
    {value: 'day7', viewValue: 'Sonntag'}
  ];


  abbort(): void {
    this.dialogRef.close();
  }
}
