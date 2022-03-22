import { Component, HostListener } from '@angular/core';
import { UserService } from '@linktank/ngx-auth';
@Component({
  selector: 'linktank-pin-pad',
  templateUrl: './pin-pad.component.html',
  styleUrls: ['./pin-pad.component.scss'],
})
export class PinPadComponent {
  entry: string;
  errorMsg: string;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.click(event.key);
  }

  constructor(private user: UserService) {
    this.entry = '';
    this.errorMsg = '';
  }

  click(btn: string) {
    this.errorMsg = '';
    switch (btn) {
      case 'Enter':
        this.submit();
        break;
      case 'Backspace':
        this.entry = this.entry.slice(0, -1);
        break;
      case Number.parseInt(btn).toString():
        if (this.entry.length < 6) {
          this.entry += btn;
        } else {
          this.errorMsg = 'PIN must be 4-6 digits';
        }
        break;
      default:
        break;
    }
  }

  submit() {
    if (this.entry.length < 4) {
      this.errorMsg = 'PIN must be 4-6 digits';
      return;
    }
    if (this.user.unlockToken(this.entry)) {
      this.entry = '';
      this.errorMsg = '';
    } else {
      this.errorMsg = 'INVALID PIN';
    }
  }
}
