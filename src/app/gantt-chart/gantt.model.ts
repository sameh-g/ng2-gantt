import { GanttBar } from './barchart/ganttbar.model'

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
    Direction: boolean = true;
    CurrentYear: number;

    public GanttBarStart: GanttBar;
    public GanttBarProgress: GanttBar;
    public GanttBarEnd: GanttBar;
    public GanttBarForcasted: GanttBar;

    constructor(StartDate: string, EndDate: string, ActualStartDate: string, ActualEndDate: string,
        ForcastedDate: string, Progress: number, Status: number, Direction: boolean, currentYear: number) {
        this.CurrentYear = currentYear;
        try {
            if (StartDate == null)
                this.StartDateDay = 0;
            if (EndDate == null)
                this.EndDateDay = 0;
            if (ActualStartDate == null)
                this.ActualStartDateDay = 0;
            if (ForcastedDate == null)
                this.ForcastDay = 0;
            if (Progress == null)
                this.Progress = 0;
            if (Status == null)
                this.Status = 0;
            if (currentYear == null)
                this.CurrentYear = 2016;

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

            this.Direction = Direction;


            this.GanttBarStart = new GanttBar();
            this.GanttBarProgress = new GanttBar();
            this.GanttBarEnd = new GanttBar();
            this.GanttBarForcasted = new GanttBar();
        }
        catch (x) {
            throw 'error'

        }

    }


    getDayOfTheYear(date: Date): any {

        return this.getDayOfTheYearInCurrent(date, this.CurrentYear);
        // return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }

    getDayOfTheYearInCurrent(date: Date, CurrentYear: number): any {

        var datediffernece = CurrentYear - date.getFullYear();
        var dateexpand = datediffernece * 365;
        var days = (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
        var daysDiff = days - dateexpand;
        return daysDiff;

    }

}


