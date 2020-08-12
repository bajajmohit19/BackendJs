import mongoose from 'mongoose'

export type ChatLogs = mongoose.Document & { 
   createdAt: string,
   intent_matched: string,
   psid: string,
   sender: Sender,
   sessionId: string,
   timestamp:string,
   updatedAt: string
}
enum Sender {
    'chatbot', 'customer'
}


const chatSchema = new mongoose.Schema({
    createdAt: { type: Date, default: new Date() },
    intent_matched:  String,
    psid: String,
    sender: {type: String,enum:['chatbot', 'customer']},
    sessionId: String,
    timestamp: {type : Date, default: new Date()},
    updatedAt: {type: Date, default: new Date()}
}, { timestamps: true });

export const Chat = mongoose.model<ChatLogs>("chat_logs", chatSchema);