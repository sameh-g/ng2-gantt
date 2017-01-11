import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']

})
export class BarchartComponent implements OnInit {

  constructor() { }

  private _from: number=0;
  private _to: string='';
  private _color: string="";

  ngOnInit() {
  }


 @Input('color') set color(color) {
    this._color = color;
    console.log(color)
  }
  
 @Input('from') set from(from) {
    this._from = from;
    console.log(from)
  }
 @Input('to') set to(to) {
    this._to = to;
    console.log(to)
  }

}
