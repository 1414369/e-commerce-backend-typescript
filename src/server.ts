import app from "./app";
import { logger } from '@/helpers';
import { ChatServer } from '@/server-chat/server'
import { ServerChatController } from './server-chat/controller'

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    logger.info('listening on port ' + PORT);
})

const chatServer = new ChatServer(server);
ServerChatController(chatServer);