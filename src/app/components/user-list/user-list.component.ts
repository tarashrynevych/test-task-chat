import {Component, EventEmitter, Input, Output} from '@angular/core';

import { User}  from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: User[];

  @Output() selectUser: EventEmitter<number> = new EventEmitter<number>();
}
