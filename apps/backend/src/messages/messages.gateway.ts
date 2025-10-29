import { Injectable } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: 'http:localhost:3000',
    methods: ["GET", "POST"],
  },
})
@Injectable()
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  emitThreadCreated(payload: unknown) {
    this.server.emit("thread.created", payload);
  }
}