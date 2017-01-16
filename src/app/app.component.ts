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
    gantt4: Gantt;
    gantt5: Gantt;
    gantt6: Gantt;
    gantt7: Gantt;
    gantt8: Gantt;
    gantt9: Gantt;
    gantt10: Gantt;
    gantt11: Gantt;
    constructor() {
        // StartDate
        // EndDate
        // ActualStartDate
        // ActualEndDate
        // ForcastedDate
        //Progress
        //Status
        this.gantt1 = new Gantt("01/01/2016", "11/30/2016", "01/20/2016", "11/15/2016", "", 100, 3,false);
        this.gantt2 = new Gantt("01/01/2016", "11/05/2016", "01/01/2016", "11/05/2016", "", 100, 3,false);
        this.gantt3 = new Gantt("01/01/2016", "12/05/2016", "01/01/2016", "", "", 50, 3,false);

        this.gantt4 = new Gantt("01/01/2016", "10/30/2016", "01/30/2016", "", "12/30/2016", 50, 3,false);

        this.gantt5 = new Gantt("01/25/2016", "11/05/2016", "01/01/2016", "", "", 50, 3,false);

        this.gantt6 = new Gantt("01/20/2016", "12/05/2016", "01/30/2016", "", "", 50, 3,false);

        this.gantt7 = new Gantt("03/20/2016", "12/05/2016", "", "", "", 10, 3,false);

        this.gantt8 = new Gantt("01/01/2016", "12/05/2016", "01/20/2016", "12/15/2016", "", 100, 3,false);
        this.gantt9 = new Gantt("01/30/2016", "12/15/2016", "01/01/2016", "11/15/2016", "", 100, 3,false);
        this.gantt10 = new Gantt("01/30/2016", "10/15/2016", "01/01/2016", "", "12/01/2016", 50, 3,false);
        this.gantt11 = new Gantt("01/01/2016", "12/30/2016", "01/01/2016", "", "10/01/2016", 50, 3,false);

    }

}
