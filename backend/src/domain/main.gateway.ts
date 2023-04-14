import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
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
import { CreateUserDto } from 'src/dto/user';

enum IncomingMessages {
  LOGIN = 'user:login',
  JOIN = 'user:join',
}

enum SentMessages {
  GET = 'user:get',
  JOINED = 'user:joined',
}

@WebSocketGateway({cors: true})
export class MainGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private roomService: RoomService,
    private userService: UserService,
  ) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage(IncomingMessages.LOGIN)
  handleLogin(@ConnectedSocket() client: Socket, @MessageBody() data: CreateUserDto): void {
    const user = this.userService.create({
      name: data.name,
      socketId: client.id,
    });
    const room = this.roomService.create(user);
    client.emit(SentMessages.GET, {
      user,
      room,
    });
  }

  @SubscribeMessage(IncomingMessages.JOIN)
  handleJoin(client: Socket, payload: JoinRoomDto) {
    // add validations;
    const room = this.roomService.join(payload);
    client.emit(SentMessages.JOINED, {
      room,
    });
  }

  @SubscribeMessage(IncomingMessages.JOIN)
  handleTeamChange(client: Socket, payload: JoinRoomDto) {
    // add validations;
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    try {
      this.userService.remove(client.id);
    } catch (e) {
      this.logger.error('cant remove userId: ', client.id);
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
