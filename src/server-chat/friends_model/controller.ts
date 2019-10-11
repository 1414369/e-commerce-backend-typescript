import User from '@/api/users/model';
import Chats, { iFriend } from './model'
import * as _ from 'lodash';
import { Types } from 'mongoose';

export class FriendController {
    static friendList: iFriend[];

    static async getById(email: string) {
        let aFriend = await User.findOne({ email: email });
        if (aFriend) {
            return _.pick(aFriend, ['_id', 'email', 'name']);
        }
        return {};
    }

    static async getAll(myID: string) {
        if (Types.ObjectId.isValid(myID)) {
            let me = await Chats.findById(myID).populate({ path: 'friends.userInfo', select: 'name _id' });
            if (me) {
                return me.friends;
            }
        }
        return [];
    }

    static async addFriend(myID: string, FriendID: string) {
        let me = await Chats.findById(myID).populate({ path: 'friends.userInfo', select: 'name _id' });

        let friend: iFriend = {
            _id: new Types.ObjectId(FriendID),
            userInfo: new Types.ObjectId(FriendID),
            messages: [],
            friendDate: new Date().getTime()
        };

        if (me) {
            this.friendList = me.friends;
            if (!this.checkFriend(FriendID)) {
                me.friends.push(friend);
            }
        } else {
            me = new Chats();
            me._id = myID;
            me.friends.push(friend);
        }

        await me.save();

        return this.getAll(me.id);
    }
    static async removeFriend(myID: string, FriendID: string) {
        let me = await Chats.findById(myID);

        me.friends.pull(FriendID);
        await me.save();

        return this.getAll(me.id);
    }

    static checkFriend(friendID: string): iFriend {
        return this.friendList.find((friend) => {
            let boolV = friend.userInfo.equals(friendID);
            return boolV;
        })
    }
}
