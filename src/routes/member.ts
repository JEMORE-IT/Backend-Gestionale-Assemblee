import { SocioRepository } from "../database/entities/Socio/Socio.repository";
import { Socio } from "../database/entities/Socio/Socio.entity";
import verifyToken from "../middleware/verifyToken";
import { Router, Request, Response } from "express";
import checkId from "../middleware/checkiId";
import { checkParams, isNumber } from "../utils";

export var router_member: Router = Router()

router_member.get('/', [verifyToken], async (req: Request, res:Response) => {
    try {
        const result: Socio[] = await SocioRepository.findAll()
        return res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send('Errore nella lettura del database')
    }
})

router_member.get('/:id', [checkId, verifyToken], async (req: Request, res:Response) => {
    try {
        const result: Socio = await  SocioRepository.findbyId(+req.params.id)
        return res.json(result)
    } catch {
        res.status(500).send('Errore nella lettura del database')
    }
})

router_member.post('/', [verifyToken], async (req: Request, res:Response) => {
    const params = ["name"];
    if (!checkParams(req.body, params)) {
        return res.status(400).json({ message: 'Parametri nel body non validi' });
    }

    try {
        const newMember: Socio = await SocioRepository.createMember(req.body['name'])
        const result: Socio = await SocioRepository.save(newMember)
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database')
    }  
})

router_member.put('/active/:id', [checkId, verifyToken], async (req: Request, res:Response) =>  {
    const params = ["active"];
    if (!checkParams(req.body, params)) {
        return res.status(400).json({ message: 'Parametri nel body non validi' });
    }

    if (!isNumber(req.params.id) || (+req.body["active"] != 1 && +req.body["active"] != 0)) {
        return res.status(400).json({ message: 'Pramentro active non valido' });
    }
    const active: boolean = +req.body["active"] == 1 ? true : false
    console.log(active)

    try {
        let member: Socio = await SocioRepository.findbyId(+req.params.id)
        if(!member) {
            return res.status(400).json({ message: 'Socio non esistente' });
        }

        const result: Socio = await SocioRepository.setActive(member, active)
        return res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send('Errore nella scrittura sul database')
    }
})

router_member.delete('/:id', [checkId, verifyToken], async (req: Request, res:Response) => {
    try {
        const result = await SocioRepository.deleteById(+req.params.id)
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database')
    }
})