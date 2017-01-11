import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']

})
export class BarchartComponent implements OnInit {

  constructor() { }

  private _position: string='';
  private _width: string='';
  private _color: string="";

  ngOnInit() {
  }


 @Input('color') set color(color) {
    this._color = color;
    console.log(color)
  }
  
 @Input('position') set from(position) {
    this._position = position;
    console.log(position)
  }
 @Input('width') set width(width) {
    this._width = width;
    console.log("mina..",width)
  }

}
