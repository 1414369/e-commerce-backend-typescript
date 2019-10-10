import { iTokenData } from '@/api/users/model';
import { iSocketData, iSocket } from '@/_interface/new_message';
import * as WebSocket from "ws"
import { authenticateSocket } from '../middleware/auth'
import { eventNames } from 'cluster';

export class ChatServer {
    private ws: WebSocket;
    private callbacks = {};
    private clients: WebSocket[] = [];
    private numberClients = 0;

    constructor(server) {
        let wss = new WebSocket.Server({
            server
        });

        wss.on('connection', (ws) => {
            this.ws = ws;
            ws.on('message', this.onmessage.bind(this))
            ws.onclose = (evt: WebSocket.CloseEvent) => {
                let id = evt.target["id"];

                if (id) {
                    delete this.clients[id];
                    this.numberClients--;
                }
            };
        });

    }
    onmessage(evt: string) {
        console.log(evt);
        let socket: iSocket = JSON.parse(evt);

        //Authorization
        let userInfo: iTokenData = authenticateSocket(socket.token);

        if (userInfo) {
            delete socket.token;

            this.registerClient(userInfo._id);

            socket.data.id = userInfo._id;
            socket.data.time_date = new Date().getTime();

            this.dispatch(socket.event, socket.data);
        } else {
            this.ws.close();
        }
    };

    registerClient(id: string) {
        this.clients[id] = this.clients[id] || null;
        this.ws["id"] = id;
        this.clients[id] = this.ws;
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

    dispatch(event_name, data: iSocketData) {
        var chain = this.callbacks[event_name];
        if (typeof chain == 'undefined') return; // no callbacks for this event
        for (var i = 0; i < chain.length; i++) {
            chain[i](data)
        }
    }
}