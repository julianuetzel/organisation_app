import { Component, OnInit } from '@angular/core';
import { Finances, FinanceType } from './finances';
import { FinancesService } from '../finances.service';

import { DialogComponent } from './dialog/dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {
  date = new Date();
  print_date = this.formateDate(this.date);
  displayedColumns: string[] = ['name', 'amount'];

  private finance!: Finances;
  finances: Finances[] = [];
  financesExpenditure: Finances[] = [];
  financesIncome: Finances[] = [];

  constructor(
    private financeservive: FinancesService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMonthlyBalance(this.date.getMonth(), this.date.getFullYear())
  }
  
  sortByType(finances: Finances[]){
    for (var finance of finances) {
      if (finance.type == FinanceType.expenditure){
        this.financesExpenditure.push()
      }
      else if (finance.type == FinanceType.income) {
        this.financesIncome.push()
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

  formateDate(date: Date): string {
    var month = this.getMonthName(date.getMonth());
    return([
      month,
      date.getFullYear().toString(),
    ].join(" "))
  }

  getMonthlyBalance(month: number, year: number): void{
    	this.financeservive.get_by_month(month, year)
      .subscribe((data: Finances[]) => this.finances = [
        ...data]
      );
      this.sortByType(this.finances)
      console.log(this.finances.values, this.finances)
  }

  getFinancesById(id: string): void {
    this.financeservive.get_by_id(id)
    .subscribe((data: Finances) => this.finance = {
      ...data
    });
    console.log(this.finance)
  }

  addFinance(type: FinanceType, name: string, amount: number): void{
    let new_finance : Finances = {
      id: uuidv4(),
      type: type,
      name: name.trim(),
      amount: amount,
      date: Date.now().toString()
    };
    if (type == FinanceType.expenditure) {
      this.financeservive.create(new_finance)
      .subscribe(finance => this.financesExpenditure.push(finance))
    }
    else if (type == FinanceType.income) {
      this.financeservive.create(new_finance)
      .subscribe(finance => this.financesIncome.push(finance))
    }
  }

  updateFinance(finance: Finances, updated_name: string, updated_amount: number): void {
    finance.name = updated_name;
    finance.amount = updated_amount;

    this.financeservive.update(finance).subscribe()
  }

  deleteFinance(finance: Finances): void{
    this.financeservive.delete(finance.id).subscribe()
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

  openCreateDialog(type: FinanceType){
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
    return this.financesIncome.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  getExpenditure() {
    return this.financesExpenditure.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  getTotalCost() {
    return (this.getIncome() - this.getExpenditure());
  }

  month_before(){
    this.date.setMonth(this.date.getMonth()-1);
    this.print_date = this.formateDate(this.date);
    console.log(this.formateDate(this.date));
  }

  month_after(){
    this.date.setMonth(this.date.getMonth()+1);
    this.print_date = this.formateDate(this.date);
    console.log(this.formateDate(this.date));
  }

}
