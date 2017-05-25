import { Component, ChangeDetectionStrategy } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-root',

    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentDate: Date = new Date(2017, 4, 10, 9, 0);
    view;
    public scheduleData: any;

    constructor() {

    }
    events: any[];
    headerConfig: any;
    license: string;
    ngOnInit() {
       
    }

}
