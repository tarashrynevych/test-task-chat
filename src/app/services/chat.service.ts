import { io } from "socket.io-client";

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() {
    const socket = io('ws://localhost:3333', { transports: ['websocket'] });
    socket.on('connect', () => {
      console.log('connect', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.log('connect_error', error);
      socket.connect();
    })
  }
}
