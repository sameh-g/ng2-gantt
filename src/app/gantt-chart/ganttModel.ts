export class Gantt {
    StartDate: Date = new Date();
    EndDate: Date = new Date();
    ActualStartDate: Date = new Date();
    ActualEndDate: Date = new Date();
    ForcastedDate: Date = new Date();

    StartDateDay: number = 0;
    EndDateDay: number = 0;
    ActualStartDateDay: number = 0;
    ActualEndDateDay: number = 0;
    ForcastDay: number = 0;
    Progress: number;
    Status: number;
    constructor(StartDate: string, EndDate: string, ActualStartDate: string, ActualEndDate: string,
        ForcastedDate: string, Progress: number, Status: number) {
        if (Progress == 0) {
            ForcastedDate = "";
            ActualStartDate = ""
        }
        if (StartDate != "") {
            this.StartDate = new Date(StartDate);
            this.StartDateDay = this.getDayOfTheYear(this.StartDate);
        }
        if (EndDate != "") {
            this.EndDate = new Date(EndDate);
            this.EndDateDay = this.getDayOfTheYear(this.EndDate);
        }
        if (ActualStartDate != "") {
            this.ActualStartDate = new Date(ActualStartDate);
            this.ActualStartDateDay = this.getDayOfTheYear(this.ActualStartDate);
        }
        if (ActualEndDate != "") {
            this.ActualEndDate = new Date(ActualEndDate);
            this.ActualEndDateDay = this.getDayOfTheYear(this.ActualEndDate);
        }
        if (ForcastedDate != "") {
            this.ForcastedDate = new Date(ForcastedDate);
            this.ForcastDay = this.getDayOfTheYear(this.ForcastedDate);
        }

        this.Progress = Progress;
        this.Status = Status;

        //console.log("Forcast", this.ForcastedDate);
        // console.log("ForcastDay", this.ForcastDay);
        // console.log("StartDateDay", this.StartDateDay);
        // console.log("EndDateDay", this.EndDateDay);
        // console.log("ActualStartDateDay", this.ActualStartDateDay);
        // console.log("ActualEndDateDay", this.ActualEndDateDay);

    }

    getDayOfTheYear(date: Date): any {
        return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }

}


