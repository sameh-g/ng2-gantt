import {
  Component,
  OnInit
  , Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { GanttBar } from './ganttbar.model';

@Component({
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(1000)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']

})
export class BarchartComponent implements OnInit {
  private _bar: GanttBar;

  constructor() {

  }

  setStyle(): any {
    if (this._bar.direction) {
      return {
        'background-color': this._bar.color,
        'width': this._bar.width.toString() + '%',
        'right': this._bar.position.toString() + '%',
        'border-radius': this.setRound()
      }

    }
    else {
      return {
        'background-color': this._bar.color,
        'width': this._bar.width.toString() + '%',
        'left': this._bar.position.toString() + '%',
        'border-radius': this.setRound()
      }
    }


  }

  setRightArrow(): any {

    if ((this._bar.arrowDirection == "right"||this._bar.arrowDirection == "both")&& this._bar.width!=0)
      return {
        'position': 'absolute',
        'visibility': 'visible',
        'top': "-18px",
        'width': "16px",
        'right': "-8px"
      }
    else {
      return {
        'position': 'absolute',
        'visibility': 'hidden',
        'top': "-18px",
        'width': "16px",
        'right': "-8px"
      }
    }
   

  }
 
  setLeftArrow():any{
    if ((this._bar.arrowDirection == "left"||this._bar.arrowDirection == "both")&& this._bar.width!=0)
      return {
        'position': 'absolute',
        'visibility': 'visible',
        'top': "-18px",
        'width': "16px",
        'left': "-8px"
      }
    else {
      return {
        'position': 'absolute',
        'visibility': 'hidden',
        'top': "-18px",
        'width': "16px",
        'left': "-8px"
      }
    }
  }

  setRound(): any {
    var rightRound='0 4px 4px 0';
    var leftRound='4px 0px 0px 4px';

    if (this._bar.roundDirecton == "right")
      return  '0 4px 4px 0'
    else if (this._bar.roundDirecton == "left")
      return  '4px 0px 0px 4px'
  }


  ngOnInit() {
  }


  @Input('ganttbar') set bar(bar) {
    this._bar = bar;
  }
}
