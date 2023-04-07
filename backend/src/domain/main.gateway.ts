import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from './room/room.service';
import { UserService } from './user/user.service';
import { JoinRoomDto } from 'src/dto/room';

enum IncomingMessages {
  LOGIN = 'user:login',
  JOIN = 'room"join',
}

enum SentMessages {
  GET_USER = 'GET_USER'
}

@WebSocketGateway()
export class MainGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private roomService: RoomService, private userService: UserService) { }
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage(IncomingMessages.LOGIN)
  handleLogin(client: Socket, userName: string): void {
    const user = this.userService.create({name: userName, socketId: client.id});
    const room = this.roomService.create(user);
    client.emit(SentMessages.GET_USER, {
      user,
      room,
    });
  }

  @SubscribeMessage(IncomingMessages.JOIN)
  handleJoin(client: Socket, payload: JoinRoomDto): void {
    // add validations;
    const room = this.roomService.join(payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
