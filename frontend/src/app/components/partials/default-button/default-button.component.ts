import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css'],
})
export class DefaultButtonComponent {
  @Input()
  type: 'submit' | 'button' = 'submit';

  @Input()
  text: string = 'Submit';
  
  @Input()
  bgColor: string = '#e72929';

  @Input()
  color: string = 'white';

  @Input()
  fontSizeRem = 1.3;

  @Input()
  widthRem = 12;

  @Output()
  onClick = new EventEmitter();
}
