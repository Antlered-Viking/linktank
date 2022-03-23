import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router) {
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
    if (this.user) {
      if (!this.user.avatarURL) {
        this.user.avatarURL =
          'https://avatars.dicebear.com/api/identicon/' +
          this.user.name +
          '.svg';
      }
      this.router.navigate(['/links']);
    }
  }

  logout() {
    this.userService.logout();
    this.user = undefined;
    this.isLoggedIn = false;
    this.toggleVisibility();
    this.router.navigate(['/home']);
  }
}
