import { Observable } from 'rxjs';

import { Component } from '@angular/core';

import { ChatService } from './services/chat.service';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly users$: Observable<User[]> = this.chartService.usersList$;
  public readonly userNameIsSet$: Observable<boolean> = this.chartService.userIsSet$;

  constructor(private chartService: ChatService) {}

  public selectUser(userId: number): void {

  }

  public addNewUser(userName: string): void {
    this.chartService.addUser(userName);
  }
}
