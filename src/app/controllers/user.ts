import { User, UserDocument } from "../models/User";
import { errorObj, successObj, secret, BodyData, ApiResp } from "../../config/settings";
import _ from "lodash";
import moment from "moment";

let userCtrl = {
    add: (data: BodyData) => {
        return new Promise(async (resolve) => {
            const entity: UserDocument = new User();
            _.each(data, (value: any, key: keyof UserDocument) => {
                (entity[key] as UserDocument) = value;
            });
            entity.save(async (err: any, doc: UserDocument) => {
                if (err || !doc) {
                    if (err.code === 11000)
                        return resolve({ ...errorObj, message: "User Id already exist", data: doc });
                    console.error(err)
                    return resolve({ ...errorObj, message: "Error Saving User Details" });
                }
                return resolve({ ...successObj, message: "User data added successfully", data: doc });
            });

        });
    },
    get: (id: any, data: any) => {
        return new Promise(async (resolve) => {
            if (data.startDate && data.endDate) {
                data.date = { $gte: moment(data.startDate).toDate(), $lt: moment(data.endDate).toDate() }
                delete data.startDate
                delete data.endDate
            }
            User.aggregate([
                {
                    $match: {
                        userId: parseInt(id),
                        ...data
                    }
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
            ]).exec((err: any, result: any) => {
                console.log(result)
                if(err) return resolve({...errorObj, message:'Error getting distance', err})
                return resolve(result[0])
            })
        });
    }
}
export default userCtrl;