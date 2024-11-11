import { Router, Request, Response } from "express";

export var router_test: Router = Router()

router_test.get('/',  (req: Request, res:Response) => {
    res.send('Welcome to the /test route!');
})