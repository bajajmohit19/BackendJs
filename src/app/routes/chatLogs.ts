import chatCtrl from "../controllers/chat";
import { Request, Response } from "express";

export default (app: any) => {
    app
        .route("/user")
        .post(async (req: Request, res: Response) => {
            const { body } = req;
            console.log(body)
            let resp = await chatCtrl.add({ ...body });
            res.json(resp);
        })
    app
        .route("/chatLogs")
        .post(async (req: Request, res: Response) => {
            const { body, params } = req;
            let resp = await chatCtrl.get(params.id, { ...body });
            console.log(resp)
            res.json(resp);
        });
}