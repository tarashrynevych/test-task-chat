import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { BehaviorSubject, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { Injectable } from '@angular/core';

import { Message } from '../interfaces/message.interface';
import { SocketEventsEnum } from '../enums/socket-events.enum';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public readonly usersList$: Subject<User[]> = new Subject<User[]>();
  public readonly newMessage$: Subject<Message> = new Subject<Message>();
  public readonly userIsSet$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private userId: string;
  private socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor() {
    this.initSocket();
    this.addSocketListeners();
  }

  public postMessage(messageText: string): void {
    const payload = {
      messageText,
      userId: this.userId
    };

    this.socket.emit('new message', payload)
  }

  public addUser(userName: string): void {
    this.userIsSet$.next(true);
    this.socket.emit(SocketEventsEnum.ADD_USER, userName)
  }

  private initSocket(): void {
    this.socket = io(environment.socketURL, { transports: ['websocket'] });
  }

  private addSocketListeners(): void {
    this.socket.on(SocketEventsEnum.CONNECT, () => {
      this.userId = this.socket.id;
    });
    this.socket.on(SocketEventsEnum.USERS_LIST, (usersList: User[]) => {
      console.log('list of user ', usersList);
      this.usersList$.next(usersList)
    });
    this.socket.on(SocketEventsEnum.NEW_MESSAGE, (message: Message) => {
      console.log('new message ', message);
      this.newMessage$.next(message)
    });
  }
}
