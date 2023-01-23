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
  print_date = this.getPrintDate(this.date);
  displayedColumns: string[] = ['name', 'amount'];

  private finance!: Finances;
  finances: Finances[] = [];
  financesExpenditure: Finances[] = [];
  financesIncome: Finances[] = [];

  income!: MatTableDataSource<Finances>
  expenditure!: MatTableDataSource<Finances>
  month = this.date.getMonth()+1;
  
  constructor(
    private financeservive: FinancesService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    console.log(this.date)
    this.getMonthlyBalance(this.date)
  }
  
  getMonth(): string {
    console.log("this.month = ", this.month)
    if (this.month < 10) {
      return ("0" + this.month.toString())
    }
    else {
      return this.month.toString();
    }
  }

  sortByType(finances: Finances[]){
    for (var finance of finances) {
      if (finance.type == 0){
        this.financesExpenditure.push(finance)
        console.log(finance)
      }
      else if (finance.type == 1) {
        this.financesIncome.push(finance)
        console.log(finance)
      }
      else {
        console.log("Something went wrong with Sorting!")
      }
    }
  }

  // Dateformat: January 2023 
  getPrintDate(date: Date): string {
    var month;
    switch(date.getMonth()){
      case 0: month = "Januar"; break;
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
    return([
      month,
      date.getFullYear().toString(),
    ].join(" "))
  }

  // Dateformat: 01/2023
  getDatabaseDate(date: Date): string {
    var month;
    // 01 - 09
    if ((date.getMonth() + 1) < 10) {
      month = "0" + (date.getMonth()+1).toString()
    }

    // 10, 11, 12
    else {
      month = (date.getMonth() + 1).toString()
    }

    return ([
      month.toString(),
      date.getFullYear().toString()
    ].join("-"))
  }

  getMonthlyBalance(date: Date): void{
    this.finances = []
    this.financesExpenditure = []
    this.financesIncome = []
    	this.financeservive.get_by_month(this.getDatabaseDate(date))
      .subscribe(finances => {
        this.finances = finances;
        this.sortByType(this.finances);        
        this.expenditure = new MatTableDataSource(this.financesExpenditure);
        this.income = new MatTableDataSource(this.financesIncome);
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
      date: this.getDatabaseDate(this.date),
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
    this.financeservive.update(updated_finance, finance).subscribe();
    setTimeout(() => {this.getMonthlyBalance(this.date)}, 500) 
  }

  deleteFinance(finance: Finances): void{
    this.finances = this.finances.filter(finance => finance !== finance)
    this.financeservive.delete(finance._id).subscribe();
    setTimeout(() => {this.getMonthlyBalance(this.date)}, 500)    
  }

  openDialog(finance: Finances){
    const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {
          id: finance._id,
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
    this.financesExpenditure = [];
    this.financesIncome = [];
    this.date.setMonth(this.date.getMonth()-1);
    console.log(this.date)
    this.print_date = this.getPrintDate(this.date);
    this.getMonthlyBalance(this.date)
    console.log(this.date, this.getDatabaseDate(this.date))
  }

  month_after(){
    this.financesExpenditure = [];
    this.financesIncome = [];
    this.date.setMonth(this.date.getMonth()+1);
    console.log(this.date)
    this.print_date = this.getPrintDate(this.date);
    this.getMonthlyBalance(this.date)
    console.log(this.date, this.getDatabaseDate(this.date))
  }

}
