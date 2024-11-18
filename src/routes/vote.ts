import { SocioRepository } from "../database/entities/Socio/Socio.repository";
import { VotoRepository } from "../database/entities/Voto/Voto.repository";
import { RigaRepository } from "../database/entities/Riga/Riga.repository";
import { VoteType, Voto } from "../database/entities/Voto/Voto.entity";
import { Socio } from "../database/entities/Socio/Socio.entity";
import { Riga } from "../database/entities/Riga/Riga.entity";
import { Router, Request, Response } from "express";
import verifyToken from "../middleware/verifyToken";
import { checkParams, isNumber } from "../utils";
import checkId from "../middleware/checkiId";

export var router_vote: Router = Router()
router_vote.use(verifyToken)

router_vote.get('/', async (req: Request, res:Response) => {
    try {
        const result: Voto[] = await VotoRepository.findAll()
        return res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send('Errore nella lettura del database')
    }
})

router_vote.get('/:id', [checkId], async (req: Request, res:Response) => {
    try {
        const result: Voto = await  VotoRepository.findbyId(+req.params.id)
        return res.json(result)
    } catch {
        res.status(500).send('Errore nella lettura del database')
    }
})

router_vote.post('/', async (req: Request, res:Response) => {
    const params = ["vote", "member", "riga"];
    if (!checkParams(req.body, params)) {
        return res.status(400).json({ message: 'Parametri nel body non validi' });
    }

    if(!Object.values(VoteType).includes(req.body["vote"])) {
        return res.status(400).json({ message: 'Parametro vote non valido' });
    }
    if (!isNumber(req.body["member"])) {
        return res.status(400).json({ message: 'Parametro member non valido' });
    }
    if (!isNumber(req.body["riga"])) {
        return res.status(400).json({ message: 'Parametro riga non valido' });
    }

    const member: Socio = await SocioRepository.findbyId(+req.body["member"])
    const riga: Riga = await RigaRepository.findbyId(+req.body["riga"])
    if (!member) {
        return res.status(400).json({ message: 'Socio non esistente' });
    }
    if (!riga) {
        return res.status(400).json({ message: 'Riga non esistente' });
    }

    try {
        const newVote: Voto = await VotoRepository.createVote(req.body["vote"] as VoteType, member, riga)
        const result: Voto = await VotoRepository.save(newVote)
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database')
    } 
})

router_vote.delete('/:id', [checkId], async (req: Request, res:Response) => {
    try {
        const result = await VotoRepository.deleteById(+req.params.id)
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database')
    }
})