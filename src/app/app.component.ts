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
        // StartPlanned
        // EndPlanned
        // StartActual
        // EndActual
        // ForcastDate
        //Progress
        //Status
        this.gantt1 = new Gantt("02/01/2016", "06/30/2016", "03/01/2016", "10/15/2016", "11/01/2016", 60,1);
        this.gantt2 = new Gantt("01/01/2016", "10/12/2016", "01/01/2016", "11/23/2016", "11/25/2016", 20,3);
        this.gantt3 = new Gantt("02/15/2016", "6/30/2016", "03/01/2016", "11/20/2016", "", 80,2);
    }

}
