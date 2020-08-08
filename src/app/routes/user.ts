import userCtrl from "../controllers/user";
import { Request, Response } from "express";

export default (app: any) => {
    app
        .route("/user")
        .post(async (req: Request, res: Response) => {
            const { body } = req;
            let resp = await userCtrl.add({ ...body });
            res.json(resp);
        })
    app
        .route("/user/:id")
        .post(async (req: Request, res: Response) => {
            const { body, params } = req;
            let resp = await userCtrl.get(params.id, { ...body });
            res.json(resp);
        });
}