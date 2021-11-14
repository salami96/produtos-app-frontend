import { Injectable } from '@angular/core';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  listen: any;

  constructor() {
    this.listen = io('https://produtos-server.herokuapp.com');
    this.listen.on('connect', () => {
      console.log('Connected with socket id: ', this.listen.id);
    });
  }
}
