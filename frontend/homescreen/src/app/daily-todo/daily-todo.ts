export interface DailyToDo {
    _id: string,
    task: string,
    done: boolean,
    task_date: string,
}

export interface DailyToDoUpdate {
    task: string,
    done: boolean
}