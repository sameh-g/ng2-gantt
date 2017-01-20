import { Component } from '@angular/core';
import { Gantt } from "./gantt-chart/gantt.model"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
    plotband: any;
    year: number = 2016;
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

        this.drawGantt(this.year);

    }

    nextYear() {
        this.year++;
        this.drawGantt(this.year);
    }

    drawGantt(year) {
        // StartDate
        // EndDate
        // ActualStartDate
        // ActualEndDate
        // ForcastedDate
        //Progress
        //Status
        this.gantt1 = new Gantt("01/01/2015", "02/30/2017", "01/20/2015", "11/15/2016", "", 100, 2, false, year);
        this.gantt2 = new Gantt("01/01/2016", "11/05/2018", "01/01/2016", "11/05/2018", "", 100, 1, false, year);
        this.gantt3 = new Gantt("01/01/2016", "11/05/2016", "03/01/2016", "", "", 50, 3, false, year);
        this.gantt4 = new Gantt("01/01/2016", "10/30/2016", "01/30/2016", "", "12/20/2016", 50, 2, false, year);
        this.gantt5 = new Gantt("01/25/2016", "11/05/2016", "01/01/2016", "", "", 50, 3, false, year);
        this.gantt6 = new Gantt("01/20/2016", "12/05/2016", "01/30/2016", "", "", 50, 3, false, year);
        this.gantt7 = new Gantt("03/20/2016", "12/05/2016", "", "", "", 10, 3, false, year);
        this.gantt8 = new Gantt("01/01/2016", "12/05/2016", "01/20/2016", "12/15/2016", "", 100, 2, false, year);
        this.gantt9 = new Gantt("01/30/2016", "12/15/2016", "01/01/2016", "11/15/2016", "", 100, 2, false, year);
        this.gantt10 = new Gantt("01/30/2016", "10/15/2016", "01/01/2016", "", "12/01/2016", 50, 1, false, year);
        this.gantt11 = new Gantt("01/01/2016", "12/22/2016", "01/01/2016", "", "10/01/2016", 50, 2, false, year);
    }
    previousYear() {
        this.year--;
        this.drawGantt(this.year);
    }

}
