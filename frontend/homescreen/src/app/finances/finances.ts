export interface Finances {
    _id: string,
    name: string,
    amount: number,
    type: number,
    date: string,
}

export interface updateFinance {
    name: string,
    amount: number,
}