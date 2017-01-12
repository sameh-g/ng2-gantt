export class Gantt {
    StartPlanned: Date = new Date();
    EndPlanned: Date = new Date();
    StartActual: Date = new Date();
    EndActual: Date = new Date();

    forcast: number;

    StartPlannedDay: number;
    EndPlannedDay: number;
    StartActualDay: number;
    EndActualDay: number;

    constructor(StartPlanned: string, EndPlanned: string, StartActual: string, EndActual: string, forcast: number) {
      
        this.StartPlanned = new Date(StartPlanned);
        this.StartPlannedDay = this.getDayOfTheYear(this.StartPlanned);

        this.EndPlanned = new Date(EndPlanned);
        this.EndPlannedDay = this.getDayOfTheYear(this.EndPlanned);

        this.StartActual = new Date(StartActual);
        this.StartActualDay = this.getDayOfTheYear(this.StartActual);

        this.EndActual = new Date(EndActual);
        this.EndActualDay = this.getDayOfTheYear(this.EndActual);


        this.forcast = forcast;

    }

    getDayOfTheYear(date: Date): any {
        return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }

}


