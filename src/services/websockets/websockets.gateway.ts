import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketsGateway {
  @WebSocketServer()
  private readonly server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() { id, message }: { id: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.emit(id, message);
  }

  emitMessage(event: string, message: string) {
    this.server.emit(event, message);
  }
}