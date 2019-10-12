import { iNewMessage } from '@/_interface/new_message';
import { ChatServer } from "./server";
import { FriendController } from './friends_model/controller';
import { iFriend } from './interface/chat';
import * as WebSocket from 'ws';

export function ServerChatController(serverChat: ChatServer) {
    serverChat.bind("new_message", (data: iNewMessage) => {
        serverChat.send('new_message', data, data.receiver);
        serverChat.send('new_message', data, data.id);
    });

    serverChat.bind("register_user", (data: iNewMessage, ws: WebSocket) => {
        serverChat.registerClient(data.id, ws);
    });

    serverChat.bind("close_connection", (data: iNewMessage) => {
        //close the connection
        serverChat.close(data.id);
        console.log(data.id + " is close");
    });

    serverChat.bind("find_friend", async (data: iFriend) => {
        let friend = await FriendController.getById(data.friend_id);
        serverChat.send('find_friend_result', friend, data.id);
    });


    serverChat.bind("add_friend", async (data: iFriend) => {
        let friends = await FriendController.addFriend(data.id, data.friend_id);
        serverChat.send('friend_list', friends, data.id);
    });


    serverChat.bind("remove_friend", async (data: iFriend) => {
        let friends = await FriendController.removeFriend(data.id, data.friend_id);
        serverChat.send('friend_list', friends, data.id);
    });


    serverChat.bind("get_friends", async (data: iNewMessage) => {
        let friends = await FriendController.getAll(data.id);
        serverChat.send('friend_list', friends, data.id);
    });

}
