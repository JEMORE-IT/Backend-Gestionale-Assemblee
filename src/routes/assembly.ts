import { AssembleaRepository } from "../database/entities/Assemblea/Assemblea.repository";
import { Assemblea } from "../database/entities/Assemblea/Assemblea.entity";
import { Router, Request, Response } from "express";
import verifyToken from "../middleware/verifyToken";
import checkId from "../middleware/checkiId";
import { checkParams } from "../utils";

export var router_assembly: Router = Router()

router_assembly.get('/', [verifyToken], async (req: Request, res:Response) => {
    try {
        const result: Assemblea[] = await  AssembleaRepository.findAll()
        return res.json(result)
    } catch {
        res.status(500).send('Errore nella lettura del database')
    }
})

router_assembly.get('/:id', [checkId, verifyToken], async (req: Request, res:Response) => {
    try {
        const result: Assemblea = await  AssembleaRepository.findbyId(+req.params.id)
        return res.json(result)
    } catch {
        res.status(500).send('Errore nella lettura del database')
    }
})

router_assembly.post('/', [verifyToken], async (req: Request, res:Response) => {
    const params = ["date"];
    if (!checkParams(req.body, params)) {
        return res.status(400).json({ message: 'Parametri nel body non validi' });
    }

    const date: Date = new Date(req.body['date'])
    if (isNaN(date.getTime())) {
        return res.status(400).json({ message: 'Data non valida' });
    }

    try {
        const newAssembly: Assemblea = await AssembleaRepository.createAssembly(date)
        const result: Assemblea = await AssembleaRepository.save(newAssembly)
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database')
    }    
})

router_assembly.delete('/:id', [checkId, verifyToken], async (req: Request, res:Response) => {
    try {
        const result = await AssembleaRepository.deleteById(+req.params.id)
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database')
    }
})