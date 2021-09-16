import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  @Output() addNewUser: EventEmitter<string> = new EventEmitter<string>();

  public readonly userInfoForm = this.formBuilder.group({ userName: ['', Validators.required] });

  constructor(private formBuilder: FormBuilder) {}
}
