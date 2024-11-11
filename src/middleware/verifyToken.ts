import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import * as fs from 'fs';

const publicKey = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'), 'utf8');


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Recupera il token JWT dal cookie
    const token = req.cookies?.token; // `token` è il nome del cookie

    if (!token) {
        return res.status(401).json({ message: 'Non autorizzato' });
    }

    try {
        // Verifica il token utilizzando la chiave pubblica e l'algoritmo RS256
        jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        next(); // Il token è valido, passa al prossimo middleware
    } catch (error) {
        console.error('Errore di verifica del token:', error);

        // Risposta generica in caso di token non valido o scaduto
        return res.status(401).json({ message: 'Non autorizzato' });
    }
};

export default verifyToken;