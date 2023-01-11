export interface WeeklyToDo{
    _id: string,
    task: string,
    done: boolean,
    task_week: number,
    done_by: string,
}

export interface WeeklyToDoUpdate {
    task: string,
    done: boolean,
    done_by: string,
}