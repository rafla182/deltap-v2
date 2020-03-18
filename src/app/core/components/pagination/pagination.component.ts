import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {

    pages: number;

    private quantityByPage: number = 20;   
    
    @Input() page: number;    
    @Input() total: number;

    @Output() newPage = new EventEmitter();

    constructor() { } 

    ngOnInit() {
        this.pages = Math.ceil(this.total / this.quantityByPage);
        console.log(this.pages);
    }

    changePage(page: number) {
        this.page = page;
        window.scrollTo(0, 0);
        this.newPage.emit({page: this.page});
    }

}
