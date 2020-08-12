import {Chat, ChatLogs } from "../models/ChatLogs";
import { errorObj, successObj, secret, BodyData, ApiResp } from "../../config/settings";
import _ from "lodash";
import moment from "moment";

let chatCtrl = {
    add: (data: BodyData) => {
        console.log(data)
        return new Promise(async (resolve) => {
            const entity: ChatLogs = new Chat();
            _.each(data, (value: any, key: keyof ChatLogs) => {
                (entity[key] as ChatLogs) = value;
            });
            entity.save(async (err: any, doc: ChatLogs) => {
                if (err || !doc) {
                    if (err.code === 11000)
                        return resolve({ ...errorObj, message: "chat id already exist", data: doc });
                    console.log("asdds",err)
                    return resolve({ ...errorObj, message: "Error Saving chat Details" });
                }
                return resolve({ ...successObj, message: "chat data added successfully", data: doc });
            });

        });
    },
    
    get: (id: any, data: any) => {
        return new Promise(async (resolve) => {
            if (data.startDate && data.endDate) {
                data.createdAt = { $gte: moment(data.startDate).toDate(), $lt: moment(data.endDate).toDate() }
                delete data.startDate
                delete data.endDate
            }
            console.log(data)
            Chat.aggregate([
                {
                    $match: {
                        ...data
                    }
                },
                {
                    "$group": {
                        "_id": {
                            "sessionId": '$sessionId',
                            "sender": '$sender',
                        },
                        
                        "messageCount": {"$sum": 1},
                    }
                },
                {
                    "$group": {
                    "_id":"$_id.sessionId",
                    "messages":{
                        "$push":{
                            "sender": "$_id.sender",
                            "count": "$messageCount"
                        }
                    },

                }
            },
            
               
            ]).exec((err: any, result: any) => {
                console.log("messages",result,  err)
                if(err) return resolve({...errorObj, message:'Error getting messages', err})
                return resolve(result)
            })
        });
    }
}
export default chatCtrl;