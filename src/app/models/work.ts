export class WorkType{
    id:number;
    WorkTypeCode:string
    Description:string;
}

export class WorkItem{
    id:number;
    WorkItemCode:string;
    Description:string;
    WorkTypeCode:number;
}