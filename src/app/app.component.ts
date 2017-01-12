import { Component } from '@angular/core';
import { Gantt } from "./gantt-chart/ganttModel"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
    plotband: any;

    gantt1: Gantt;
    gantt2: Gantt;
    gantt3: Gantt;

    constructor() {
        this.gantt1 = new Gantt("02/20/2016", "06/30/2016", "03/01/2016", "07/30/2016","08/25/2016", 8);
        this.gantt2 = new Gantt("02/01/2016", "10/12/2016", "03/15/2016", "11/23/2016","12/25/2016", 6);
        this.gantt3 = new Gantt("03/01/2016", "6/30/2016", "03/30/2016", "08/30/2016","11/25/2016", 5);
    }

}
