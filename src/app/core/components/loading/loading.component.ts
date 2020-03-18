import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { LoadingService, LoadingEvent } from './loading.service';

@Component({
    selector: 'app-loading',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, AfterViewInit {

    @Input() show = false;

    constructor(public loadingService: LoadingService, private _elmRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.loadingService.events.subscribe((event: LoadingEvent) => {
            this.show = event.visible;
        });
    }

    ngAfterViewInit(): void {
        this.loadingService.events.subscribe((event: LoadingEvent) => {
            this._elmRef.nativeElement.visible = event.visible;
            this._changeDetectorRef.detectChanges();
        });
    }
}
