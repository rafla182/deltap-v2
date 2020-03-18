import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Pipe({
    name: 'dateFormatHour'
})

export class DateFormatPipeHour extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const datePipe = new DatePipe('pt-BR');
        value = datePipe.transform(value, 'dd/MM/yyyy HH:mm', 'pt-BR');
        return value;
    }
}
