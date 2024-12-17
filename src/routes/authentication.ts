import { Router, Request, Response } from "express";
import verifyToken from "../middleware/verifyToken";
import { checkParams } from "../utils";
import * as jwt from "jsonwebtoken";
import * as express from "express";
import * as bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";


dotenv.config();
const passwordHash = process.env.PASSWORD
const username = process.env.USERNAME_LOGIN

export var router_authentication: Router = Router()
router_authentication.use(express.json());

var privateKey = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'), 'utf8');

const payload = { "payload": "payload" };

router_authentication.post('/',  (req: Request, res:Response) => {
    var param = ['password', 'username'];
    if (!checkParams(req.body, param)) {
        return res.status(400).json({ message: 'Parametri nel body non validi' });
    }

    if (req.body["username"] != username) {
        console.log (username)
        return res.status(401).send('Invalid username or password');
    }

    bcrypt.compare(req.body['password'], passwordHash, (err: Error | null, result: boolean) => {
        if (err) {
            res.status(500).send(err);
        } else if (result) {
            // If the passwords match, authenticate the user and create a session
            var token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });

            // Imposta il cookie HTTP-only
            res.cookie('token', token, {
                httpOnly: false, // Imposta httpOnly a false
                secure: true,
                sameSite: 'none',
                maxAge: 3600000 // 1 ora in millisecondi
            });

            res.status(200).json({ message: 'Autenticazione riuscita' });
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
})


router_authentication.get('/verify-token', [verifyToken], (req: Request, res:Response) => {
    res.send('Valid token')
})


router_authentication.post('/logout', (req: Request, res:Response) => {
    res.clearCookie("token");
    res.end()
})