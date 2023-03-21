import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: '*:*' })
export class WebsocketsGateway {
  @WebSocketServer()
  private readonly server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() { id, message }: { id: string; message: string },
  ) {
    this.server.emit(id, message);
  }

  emitMessage(event: string, message: string) {
    this.server.emit(event, message);
  }
}
