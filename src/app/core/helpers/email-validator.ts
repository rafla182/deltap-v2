import {FormControl} from '@angular/forms';


export class EmailValidator {

    static isValid(value: string){
        let EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (value && (value.length <= 5 || !EMAIL_REGEXP.test(value))) {
            return false;
        }

        return true;
    }
}