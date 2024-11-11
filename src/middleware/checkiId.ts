import { Request, Response, NextFunction } from 'express';

const checkId = (req: Request, res: Response, next: NextFunction) => {
    const id: number = +req.params.id
    if (isNaN(id)) {
        return res.status(400).json({ message: 'id non valido' });
    }
    next()
}

export default checkId