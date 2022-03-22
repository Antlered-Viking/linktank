import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { UserService } from '@linktank/ngx-auth';
import { SanitizedUser } from '@linktank/users';

@Component({
  selector: 'linktank-auth-panel',
  templateUrl: './auth-panel.component.html',
  styleUrls: ['./auth-panel.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(150%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(150%)' })),
      ]),
    ]),
  ],
})
export class AuthPanelComponent {
  visible: boolean;
  isLoggedIn: boolean;
  user?: SanitizedUser;

  constructor(private userService: UserService) {
    this.visible = this.userService.user === undefined;
    this.isLoggedIn = this.userService.user !== undefined;
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.isLoggedIn = this.userService.user !== undefined;
  }

  updateUser(user: SanitizedUser | undefined) {
    this.user = user;
    this.toggleVisibility();
  }
}
