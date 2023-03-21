import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: '*:*' })
export class WebsocketsGateway {
  @WebSocketServer()
  private readonly server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody()
    {
      id,
      senderId,
      username,
      message,
    }: { id: string; senderId: string; username: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit(id, { senderId, username, message });
  }

  emitMessage(event: string, message: string) {
    this.server.emit(event, message);
  }
}
