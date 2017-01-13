export class Gantt {
    StartPlanned: Date = new Date();
    EndPlanned: Date = new Date();
    StartActual: Date = new Date();
    EndActual: Date = new Date();
    ForcastDate: Date = new Date();

    StartPlannedDay: number;
    EndPlannedDay: number;
    StartActualDay: number;
    EndActualDay: number;
    ForcastDay: number;
    Progress: number;
    Status:number;
    constructor( StartPlanned: string, EndPlanned: string, StartActual: string, EndActual: string,
       ForcastDate: string, Progress: number,Status:number) {

        this.StartPlanned = new Date(StartPlanned);
        this.StartPlannedDay = this.getDayOfTheYear(this.StartPlanned);

        this.EndPlanned = new Date(EndPlanned);
        this.EndPlannedDay = this.getDayOfTheYear(this.EndPlanned);

        this.StartActual = new Date(StartActual);
        this.StartActualDay = this.getDayOfTheYear(this.StartActual);

        this.EndActual = new Date(EndActual);
        this.EndActualDay = this.getDayOfTheYear(this.EndActual);

        this.ForcastDate = new Date(ForcastDate);
        this.ForcastDay = this.getDayOfTheYear(this.ForcastDate);

        this.Progress = Progress;
this.Status=Status;
        // console.log("Forcast", this.ForcastDate);
        // console.log("ForcastDay", this.ForcastDay);
        // console.log("StartPlannedDay", this.StartPlannedDay);
        // console.log("EndPlannedDay", this.EndPlannedDay);
        // console.log("StartActualDay", this.StartActualDay);
        // console.log("EndActualDay", this.EndActualDay);

    }

    getDayOfTheYear(date: Date): any {
        return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }

}


