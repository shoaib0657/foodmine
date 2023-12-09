import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent {

  @Input()
  label!: string;

  @Input()
  bgColor = 'white';

}
