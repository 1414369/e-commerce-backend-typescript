import { iTokenData } from '@/api/users/model';
import { iSocketData, iSocket } from '@/_interface/new_message';
import * as WebSocket from "ws"
import { authenticateSocket } from '../middleware/auth'

export class ChatServer {
    private callbacks = {};
    private clients = {};
    private numberClients = 0;

    constructor(server) {
        let wss = new WebSocket.Server({
            server
        });

        wss.on('connection', (ws) => {
            ws.on('message', (data) => {
                this.onmessage.apply(this, [data, ws]);
            })
            ws.onclose = (evt: WebSocket.CloseEvent) => {
                let id = evt.target["id"];

                if (id) {
                    delete this.clients[id];
                    this.numberClients--;
                }
            };
        });

    }
    onmessage(data: string, ws: WebSocket) {
        console.log(data);
        let socket: iSocket = JSON.parse(data);

        //Authorization
        let userInfo: iTokenData = authenticateSocket(socket.token);

        if (userInfo) {
            delete socket.token;

            socket.data.id = userInfo._id;
            socket.data.time_date = new Date().getTime();

            this.dispatch(socket.event, socket.data, ws);
        } else {
            ws.close();
        }
    };

    registerClient(id: string, ws: WebSocket) {
        this.clients[id] = this.clients[id] || null;
        ws["id"] = id;
        this.clients[id] = ws;
        this.numberClients++;
    }

    bind(event_name, callback) {
        this.callbacks[event_name] = this.callbacks[event_name] || [];
        this.callbacks[event_name].push(callback);
    };

    send(event_name: string, event_data, receiver: string) {
        let client = this.clients[receiver];
        if (client) {
            let json: string = JSON.stringify({ event: event_name, data: event_data });
            client.send(json); // <= send JSON data to socket server
        }
    };

    close(id: string) {
        if (this.clients[id]) {
            this.clients[id].close();
            delete this.clients[id];
        }
    }

    dispatch(event_name, data: iSocketData, ws: WebSocket) {
        var chain = this.callbacks[event_name];
        if (typeof chain == 'undefined') return; // no callbacks for this event
        for (var i = 0; i < chain.length; i++) {
            chain[i](data, ws)
        }
    }
}