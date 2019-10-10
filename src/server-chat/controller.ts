import { iNewMessage } from '@/_interface/new_message';
import { ChatServer } from "./server";

export function ServerChatController(serverChat: ChatServer) {
    serverChat.bind("new_message", (data: iNewMessage) => {
        serverChat.send('new_message', data, data.receiver);
    });

    serverChat.bind("register_user", (data: iNewMessage) => {
        // oke do nothing
        console.log(data.id + " is online");
    });

    serverChat.bind("close_connection", (data: iNewMessage) => {
        //close the connection
        serverChat.close(data.id);
        console.log(data.id + " is close");
    });

}
