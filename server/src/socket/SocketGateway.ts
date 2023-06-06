import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(8001, {
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected');
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('snippetUpdate')
  handleSnippetUpdate(client: Socket, data: any) {
    this.server.emit('snippetUpdate', data);
  }
}
