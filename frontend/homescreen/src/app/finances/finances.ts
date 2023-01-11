export enum FinanceType{
    income,
    expenditure,
}
export interface Finances {
    id: string,
    type: FinanceType,
    date: string,
    amount: number,
    name: string,
}