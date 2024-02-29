import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// import {Socket/}
// import { Server } from 'socket.io';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
  },
})
export class Event implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      // console.log('Connected');
    });
  }

  @SubscribeMessage('join-room')
  onJoinRoom(
    @MessageBody('babak_id') babak_id: number,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.socketsJoin(`babak ${babak_id}`);
    this.server
      .to(`babak ${babak_id}`)
      .emit(`notif-join`, `${client.id} baru saja join`);
  }

  @SubscribeMessage('start-timer')
  onStartTimer(@MessageBody('id') body: any) {
    // console.log(body);
    console.log('event masuk');
  }
}
