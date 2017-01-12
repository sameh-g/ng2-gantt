export class Gantt {
    Date1: Date = new Date();
    Date2: Date = new Date();
    Date3: Date = new Date();
    Date4: Date = new Date();

    status: number;

    Date1Day: number;
    Date2Day: number;
    Date3Day: number;
    Date4Day: number;

    constructor(date1: string, date2: string, date3: string, date4: string, status: number) {
      
        this.Date1 = new Date(date1);
        this.Date1Day = this.getDayOfTheYear(this.Date1);

        this.Date2 = new Date(date2);
        this.Date2Day = this.getDayOfTheYear(this.Date2);

        this.Date3 = new Date(date3);
        this.Date3Day = this.getDayOfTheYear(this.Date3);

        this.Date4 = new Date(date4);
        this.Date4Day = this.getDayOfTheYear(this.Date4);


        this.status = status;

    }

    getDayOfTheYear(date: Date): any {
        return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }

}


