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

    StartDateFormated: string = '';
    EndDateFormated: string = '';
    ActualStartDateFormated: string = '';
    ActualEndDateFormated: string = '';
    ForcastedDateFormated: string = '';


    Progress: number = 0;
    Status: number = 0;
    Direction: boolean = true;
    CurrentYear: number = 2016;

    public GanttBarStart: GanttBar;
    public GanttBarProgress: GanttBar;
    public GanttBarEnd: GanttBar;
    public GanttBarForcasted: GanttBar;

    constructor(StartDate: string, EndDate: string, ActualStartDate: string, ActualEndDate: string,
        ForcastedDate: string, Progress: number, Status: number, Direction: boolean, currentYear: number) {
        this.CurrentYear = currentYear;
        try {

            if (EndDate == null && ActualEndDate == null) {
                StartDate = "";
                ActualStartDate = "";
            }

            if (StartDate != "" && StartDate != null) {
                this.StartDate = new Date(StartDate);
                this.StartDateDay = this.getDayOfTheYear(this.StartDate);
                this.StartDateFormated = this.dateFormate(this.StartDate);
            }
            if (EndDate != "" && EndDate != null) {
                this.EndDate = new Date(EndDate);
                this.EndDateDay = this.getDayOfTheYear(this.EndDate);
                this.EndDateFormated = this.dateFormate(this.EndDate);
            }
            if (ActualStartDate != "" && ActualStartDate != null) {
                this.ActualStartDate = new Date(ActualStartDate);
                this.ActualStartDateDay = this.getDayOfTheYear(this.ActualStartDate);
                   this.ActualStartDateFormated = this.dateFormate(this.ActualStartDate);
            }
            if (ActualEndDate != "" && ActualEndDate != null) {
                this.ActualEndDate = new Date(ActualEndDate);
                this.ActualEndDateDay = this.getDayOfTheYear(this.ActualEndDate);
                 this.ActualEndDateFormated = this.dateFormate(this.ActualEndDate );
            }
            if (ForcastedDate != "" && ForcastedDate != null) {
                this.ForcastedDate = new Date(ForcastedDate);
                this.ForcastDay = this.getDayOfTheYear(this.ForcastedDate);
                  this.ForcastedDateFormated = this.dateFormate(this.ForcastedDate );
            }
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

    dateFormate(date: Date) {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }

}


