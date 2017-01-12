## Gantt chart rules:


- Gantt chart will be divided into Months and years, by default Gantt chart will be displaying the selected year with its months, Other years will appear by scrolling.
- The colour of the bar is the colour of the status (grey, Red, Yellow, Green and blue (if enabled))
- In case there is no Actual start date, the bar will take the colour starting the start date.
- In case the percentage of completion of the milestone is 100% in the selected time period:
If there is an Actual End date in the selected time period, the colour will take the whole bar till the Actual End date
If there is no Actual end in the time period selected the  colour will take the whole bar till the end date
Check Example attached
- In case the Percentage of completion of milestone is more than 0% and less than 100% in the selected time filter, let's assume that it is 40%:
If there is a  Forecasted date in the selected time period and actual start date , the colour will take 40% of the bar from Actual Start date to the Forecasted date
If there is a  Forecasted date in the selected time period and No actual start date , the colour will take 40% of the bar from Start date to the Forecasted date
If there is No  Forecasted date in the selected time period and actual start date , the colour will take 40% of the bar from Actual Start date to End date
If there is No Forecasted date in the selected time period and No actual start date , the colour will take 40% of the bar from Start date to the End date
Check Example attached
- In case the start date is before Actual start date, the colour between the dates is a shade lighter than the remaining of the bar
- In case the start date is after the Actual start date, the colour between the dates is a shade darker than the remaining of the bar
- In case there is no Actual start date, the original colour will start from the start date (without any shade)
- In case the End date is before Actual End date, the colour between the two dates is a shade darker than the remaining of the bar
- In case the End date is after the Actual End date, the colour between the two dates is a lighter shade of the colour.
