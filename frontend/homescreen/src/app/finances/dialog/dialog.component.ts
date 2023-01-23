import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancesService } from 'src/app/finances.service';

interface Data{
  id: string,
  name: string,
  amount: number
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private deleteService: FinancesService,
  ) {}

  abbort(): void {
    this.dialogRef.close();
  }
}
