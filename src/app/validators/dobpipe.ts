import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name:"dob"
})

export class DOBPipe implements PipeTransform

{
    transform(data:any)
    {
        if(data !=undefined){
            return data.year + '-' + data.month + '-' +data.day;
        }
        return "";
    }
}