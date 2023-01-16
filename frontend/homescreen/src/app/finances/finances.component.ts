import { Component, OnInit, ViewChild } from '@angular/core';
import { Finances, updateFinance } from './finances';
import { FinancesService } from '../finances.service';

import { DialogComponent } from './dialog/dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {
  date = new Date();
  print_date = this.formatePrintDate(this.date);
  displayedColumns: string[] = ['name', 'amount'];

  private finance!: Finances;
  finances: Finances[] = [];
  financesExpenditure: Finances[] = [];
  financesIncome: Finances[] = [];

  income!: MatTableDataSource<Finances>
  expenditure!: MatTableDataSource<Finances>
  
  constructor(
    private financeservive: FinancesService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    console.log("month=",(this.date.getMonth()+1), " year=", this.date.getFullYear())
    var month = "0" + (this.date.getMonth()+1).toString()
    this.getMonthlyBalance(month, this.date.getFullYear())
  }
  
  sortByType(finances: Finances[]){
    for (var finance of finances) {
      if (finance.type == 0){
        this.financesExpenditure.push(finance)
        this.expenditure = new MatTableDataSource(this.financesExpenditure)
        console.log(finance)
      }
      else if (finance.type == 1) {
        this.financesIncome.push(finance)
        this.income = new MatTableDataSource(this.financesIncome)
        console.log(finance)
      }
      else {
        console.log("Something went wrong with Sorting!")
      }
    }
  }

  getMonthName(month_number: number): string{
    switch (month_number) {
      case 0: var month = "Januar"; break;
      case 1: month = "Februar"; break;
      case 2: month = "März"; break;
      case 3: month = "April"; break;
      case 4: month = "Mai"; break;
      case 5: month = "Juni"; break;
      case 6: month = "Juli"; break;
      case 7: month = "August"; break;
      case 8: month = "September"; break;
      case 9: month = "Oktober"; break;
      case 10: month = "November"; break;
      case 11: month = "Dezember"; break;
      default: console.log("Something with the date went wrong!")
    }
    return month!;
  }

  formatePrintDate(date: Date): string {
    var month = this.getMonthName(date.getMonth());
    return([
      month,
      date.getFullYear().toString(),
    ].join(" "))
  }

  formatDatabaseDate(date: Date): string {
    var month;
    if ((date.getMonth() + 1) < 10) {
      month = "0" + (date.getMonth()+1).toString()
    }
    else {
      month = (date.getMonth() + 1).toString()
    }
    return ([
      month.toString(),
      date.getFullYear().toString()
    ].join("/"))
  }

  getMonthlyBalance(month: string, year: number): void{
    	this.financeservive.get_by_month(month, year)
      .subscribe(finances => {
        this.finances = finances;
        this.sortByType(this.finances);
        console.log(this.finances, this.financesExpenditure, this.financesIncome)
      })
  }

  getFinancesById(id: string): void {
    this.financeservive.get_by_id(id)
    .subscribe((data: Finances) => this.finance = {
      ...data
    });
    console.log(this.finance)
  }

  addFinance(type: number, name: string, amount: number): void{
    let new_finance : Finances = {
      _id: uuidv4(),
      type: type,
      name: name.trim(),
      amount: amount,
      date: this.formatDatabaseDate(this.date),
    };
    console.log(new_finance.date)
    if (type == 0) {
      this.financeservive.create(new_finance)
      .subscribe(finance => {
        this.financesExpenditure.push(finance);
        this.expenditure._updateChangeSubscription();
      })
    }
    else if (type == 1) {
      this.financeservive.create(new_finance)
      .subscribe(finance => {
        this.financesIncome.push(finance);
        this.income._updateChangeSubscription();
      })
    }
  }

  updateFinance(finance: Finances, updated_name: string, updated_amount: number): void {
    let updated_finance: updateFinance = {
      name: updated_name,
      amount: updated_amount,
    }
    this.financeservive.update(updated_finance, finance).subscribe(_ => {
      this.getIncome();
      this.getExpenditure();
      this.getTotalCost();
    })
  }

  deleteFinance(finance: Finances): void{
    this.financeservive.delete(finance._id).subscribe()
  }

  openDialog(finance: Finances){
    const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {
          name: finance.name,
          amount: finance.amount
        },
    })
    dialogRef.afterClosed().subscribe(result => {
      this.updateFinance(finance, result.name, result.amount)
    });
  }

  openCreateDialog(type: number){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        name: "",
        amount: 0
      },
  })
  dialogRef.afterClosed().subscribe(result => {
    this.addFinance(type, result.name, result.amount)
  });
  }

  getIncome() {
    var total = 0;
    for (var finance of this.financesIncome){
      total += finance.amount;
    }
    return total;
  }

  getExpenditure() {
    return this.financesExpenditure.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  getTotalCost() {
    return (this.getIncome() - this.getExpenditure());
  }

  month_before(){
    this.date.setMonth(this.date.getMonth()-1);
    this.print_date = this.formatePrintDate(this.date);
    console.log(this.formatePrintDate(this.date));
  }

  month_after(){
    this.date.setMonth(this.date.getMonth()+1);
    this.print_date = this.formatePrintDate(this.date);
    console.log(this.formatePrintDate(this.date));
  }

}
