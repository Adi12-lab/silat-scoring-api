import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// import {Socket/}
// import { Server } from 'socket.io';
import { Server } from 'socket.io';

@WebSocketGateway()
export class Event implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('join-room')
  onJoinRoom(@MessageBody('babak_id') babak_id: number) {
    this.server.socketsJoin('babak ' + babak_id);
  }

  @SubscribeMessage('start-timer')
  onStartTimer(@MessageBody('id') body: any) {
    console.log(body);
  }
}
