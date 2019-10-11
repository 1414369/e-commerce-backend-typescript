import { Schema, model, Document, Types } from 'mongoose'

export interface iChat extends Document {
  friends: any | iFriend
}

export interface iFriend {
  _id: Types.ObjectId,
  userInfo: Types.ObjectId,
  messages: string[],
  lastDateMessage?: number,
  friendDate: number
}


const aFriendSchema = new Schema({
  userInfo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [{
    type: String,
  }],
  lastDateMessage: {
    type: Number,
    default: new Date().getTime()
  },
  friendDate: {
    type: Number,
    default: 0
  },
})

const chatSchema = new Schema({
  friends: [aFriendSchema]
});

const Chats = model<iChat>('Chats', chatSchema);

export default Chats;