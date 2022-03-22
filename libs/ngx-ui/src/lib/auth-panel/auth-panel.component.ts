import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { UserService } from '@linktank/ngx-auth';

@Component({
  selector: 'linktank-auth-panel',
  templateUrl: './auth-panel.component.html',
  styleUrls: ['./auth-panel.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(150%)' }),
        animate('1000ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({ transform: 'translateX(150%)' })),
      ]),
    ]),
  ],
})
export class AuthPanelComponent {
  visible: boolean;
  constructor(private userService: UserService) {
    this.visible = this.userService.user === undefined;
  }
}
