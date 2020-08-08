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
const User_1 = require("../models/User");
const settings_1 = require("../../config/settings");
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
let userCtrl = {
    add: (data) => {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            const entity = new User_1.User();
            lodash_1.default.each(data, (value, key) => {
                entity[key] = value;
            });
            entity.save((err, doc) => __awaiter(void 0, void 0, void 0, function* () {
                if (err || !doc) {
                    if (err.code === 11000)
                        return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "User Id already exist", data: doc }));
                    console.error(err);
                    return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "Error Saving User Details" }));
                }
                return resolve(Object.assign(Object.assign({}, settings_1.successObj), { message: "User data added successfully", data: doc }));
            }));
        }));
    },
    get: (id, data) => {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.startDate && data.endDate) {
                data.date = { $gte: moment_1.default(data.startDate).toDate(), $lt: moment_1.default(data.endDate).toDate() };
                delete data.startDate;
                delete data.endDate;
            }
            User_1.User.aggregate([
                {
                    $match: Object.assign({ userId: parseInt(id) }, data)
                },
                {
                    "$group": {
                        "_id": '$userId',
                        sumDistance: { $sum: "$distance" }
                    }
                },
                {
                    $project: {
                        _id: '$_id',
                        sumDistance: { '$round': ['$sumDistance', 2] }
                    }
                }
            ]).exec((err, result) => {
                console.log(result);
                if (err)
                    return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: 'Error getting distance', err }));
                return resolve(result[0]);
            });
        }));
    }
};
exports.default = userCtrl;
