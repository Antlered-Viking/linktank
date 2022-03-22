import { Component } from '@angular/core';

@Component({
  selector: 'linktank-pin-pad',
  templateUrl: './pin-pad.component.html',
  styleUrls: ['./pin-pad.component.scss'],
})
export class PinPadComponent {
  entry: string;
  errorMsg: string;

  constructor() {
    this.entry = '';
    this.errorMsg = '';
  }

  click(btn: string) {
    this.errorMsg = '';
    switch (btn) {
      case 'del':
        this.entry = this.entry.slice(0, -1);
        break;
      case 'clear':
        this.entry = '';
        break;
      default:
        if (this.entry.length < 6) {
          this.entry += btn;
        } else {
          this.errorMsg = 'PIN must be 4-6 digits';
        }
        break;
    }
  }

  submit() {
    this.entry = '';
    this.errorMsg = '';
  }
}
