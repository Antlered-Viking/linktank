import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '@linktank/ngx-auth';
import { SanitizedUser } from '@linktank/users';

@Component({
  selector: 'linktank-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  name: string;
  password: string;
  usePin: boolean;
  isLoggedIn: boolean;
  @Output()
  authChangedEvent = new EventEmitter<SanitizedUser | undefined>();

  constructor(private user: UserService) {
    this.name = '';
    this.password = '';
    this.usePin = false;
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.usePin = true;
    }
  }

  async submit() {
    await this.user.login(this.name, this.password);
    this.name = '';
    this.password = '';
    this.authChangedEvent.emit(this.user.user);
  }

  catchPin(user: SanitizedUser | undefined) {
    if (user) {
      this.isLoggedIn = true;
    }
    this.authChangedEvent.emit(user);
  }
}
