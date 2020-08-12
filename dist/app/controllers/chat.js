"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChatLogs_1 = require("../models/ChatLogs");
const settings_1 = require("../../config/settings");
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
let chatCtrl = {
    add: (data) => {
        console.log(data);
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            const entity = new ChatLogs_1.Chat();
            lodash_1.default.each(data, (value, key) => {
                entity[key] = value;
            });
            entity.save((err, doc) => __awaiter(void 0, void 0, void 0, function* () {
                if (err || !doc) {
                    if (err.code === 11000)
                        return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "chat id already exist", data: doc }));
                    console.log("asdds", err);
                    return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "Error Saving chat Details" }));
                }
                return resolve(Object.assign(Object.assign({}, settings_1.successObj), { message: "chat data added successfully", data: doc }));
            }));
        }));
    },
    get: (id, data) => {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.startDate && data.endDate) {
                data.createdAt = { $gte: moment_1.default(data.startDate).toDate(), $lt: moment_1.default(data.endDate).toDate() };
                delete data.startDate;
                delete data.endDate;
            }
            console.log(data);
            ChatLogs_1.Chat.aggregate([
                {
                    $match: Object.assign({}, data)
                },
                {
                    "$group": {
                        "_id": {
                            "sessionId": '$sessionId',
                            "sender": '$sender',
                        },
                        "messageCount": { "$sum": 1 },
                    }
                },
                {
                    "$group": {
                        "_id": "$_id.sessionId",
                        "messages": {
                            "$push": {
                                "sender": "$_id.sender",
                                "count": "$messageCount"
                            }
                        },
                    }
                },
            ]).exec((err, result) => {
                console.log("messages", result, err);
                if (err)
                    return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: 'Error getting messages', err }));
                return resolve(result);
            });
        }));
    }
};
exports.default = chatCtrl;
