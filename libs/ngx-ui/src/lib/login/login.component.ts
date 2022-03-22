import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '@linktank/ngx-auth';
import { SanitizedUser } from '@linktank/users';

@Component({
  selector: 'linktank-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  name: string;
  password: string;
  @Input()
  usePin: boolean;
  isLoggedIn: boolean;
  @Output()
  authChangedEvent = new EventEmitter<SanitizedUser | undefined>();

  constructor(private user: UserService) {
    this.name = '';
    this.password = '';
    this.usePin = true;
    this.isLoggedIn = false;
  }

  async submit() {
    await this.user.login(this.name, this.password);
    this.name = '';
    this.password = '';
    this.authChangedEvent.emit(this.user.user);
  }
}
