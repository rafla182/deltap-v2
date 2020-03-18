import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Pipe({
    name: 'dateFormat'
})

export class DateFormatPipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const datePipe = new DatePipe('pt-BR');
        value = datePipe.transform(value, 'dd/MM/yyyy', 'pt-BR');
        return value;
    }
}
