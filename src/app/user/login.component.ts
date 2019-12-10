import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import { User } from './user';
import { UserData } from './user-data';

import * as fromUser from '../user/state/user-reducer';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;
  model: User;
  maskUserName: boolean;

  constructor(private store: Store<fromUser.State>,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.resetForm();

    //TODO: Unsubscribe
    this.store.pipe(select(fromUser.getMaskUserName)).subscribe(
      maskUserName => this.maskUserName = maskUserName,
    );
    //TODO: Unsubscribe
    this.store.pipe(select(fromUser.getUserName)).subscribe(
      userName => this.model.userName = userName
    );
    //TODO: Unsubscribe
    this.store.pipe(select(fromUser.getCurrentUser)).subscribe(
      currentUser => this.model = currentUser
    );
  }

  resetForm() {
    this.model = new User();
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'MASK_USER_NAME',
      payload: value
    });
  }

  inputNameChanged(value: boolean): void {
    this.store.dispatch({
      type: 'USER_NAME',
      payload: value
    });
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = this.model.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
