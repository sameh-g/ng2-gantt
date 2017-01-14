import { Component, 
  OnInit
   ,Input,
   trigger,
  state,
  style,
  transition,
  animate} from '@angular/core';

@Component({
animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(1000)
    ]),
    transition('* => void', [
      animate(100, style({transform: 'translateX(100%)'}))
    ])
  ])
],
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
  }
  
 @Input('position') set from(position) {
    this._position = position;
  }
 @Input('width') set width(width) {
    this._width = width;
  }

}
