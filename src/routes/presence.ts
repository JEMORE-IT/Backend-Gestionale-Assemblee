import { AssembleaRepository } from "../database/entities/Assemblea/Assemblea.repository";
import { PresenzaRepository } from "../database/entities/Presenza/Presenza.repository";
import { PresenceType, Presenza } from "../database/entities/Presenza/Presenza.entity";
import { Assemblea } from "../database/entities/Assemblea/Assemblea.entity";
import { SocioRepository } from "../database/entities/Socio/Socio.repository";
import { Socio } from "../database/entities/Socio/Socio.entity";
import verifyToken from "../middleware/verifyToken";
import { Router, Request, Response } from "express";
import { checkParams, isNumber } from "../utils";
import checkId from "../middleware/checkiId";

export var router_presence: Router = Router()
router_presence.use(verifyToken)

router_presence.get('/', async (req: Request, res:Response) => {
    try {
        const result: Presenza[] = await PresenzaRepository.findAll()
        return res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send('Errore nella lettura del database')
    }
})

router_presence.get('/:id', [checkId], async (req: Request, res:Response) => {
    try {
        const result: Presenza = await  PresenzaRepository.findbyId(+req.params.id)
        return res.json(result)
    } catch {
        res.status(500).send('Errore nella lettura del database')
    }
})

router_presence.get('/assembly/:id', [checkId], async (req: Request, res: Response) => {
    const assemblyId = +req.params.id;

    try {
        const assembly = await AssembleaRepository.findbyId(assemblyId);
        if (!assembly) {
            return res.status(404).json({ message: 'Assemblea non trovata' });
        }

        const presenze = await PresenzaRepository.findByAssemblyId(assemblyId);
        return res.json(presenze);
    } catch (err) {
        console.log(err);
        res.status(500).send('Errore nella lettura del database');
    }
});

router_presence.post('/', async (req: Request, res:Response) => {
    const params = ["presenza", "assembly", "member"];
    if (!checkParams(req.body, params)) {
        return res.status(400).json({ message: 'Parametri nel body non validi' });
    }

    if(!Object.values(PresenceType).includes(req.body["presenza"])) {
        return res.status(400).json({ message: 'Parametro presenza non valido' });
    }
    if (!isNumber(req.body["assembly"])) {
        return res.status(400).json({ message: 'Parametro assembly non valido' });
    }
    if (!isNumber(req.body["member"])) {
        return res.status(400).json({ message: 'Parametro member non valido' });
    }

    const assembly: Assemblea = await AssembleaRepository.findbyId(+req.body["assembly"])
    const member: Socio = await SocioRepository.findbyId(+req.body["member"])
    if (!assembly) {
        return res.status(400).json({ message: 'Assemblea non esistente' });
    }
    if (!member) {
        return res.status(400).json({ message: 'Socio non esistente' });
    }

    try {
        const newPresence: Presenza = await PresenzaRepository.createPresence(req.body["presenza"] as PresenceType, assembly, member)
        const result: Presenza = await PresenzaRepository.save(newPresence)
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database')
    }  
})

router_presence.delete('/:id', [checkId], async (req: Request, res:Response) => {
    try {
        const result = await PresenzaRepository.deleteById(+req.params.id)
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database')
    }
})

router_presence.post('/bulk-create', async (req: Request, res: Response) => {
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ message: 'Il body deve essere un array' });
    }

    try {
        const presenze = req.body;
        const results = [];
        for (const presenza of presenze) {
            const { presenza: presenzaType, assembly, member } = presenza;

            if (!Object.values(PresenceType).includes(presenzaType)) {
                return res.status(400).json({ message: 'Parametro presenza non valido' });
            }
            if (!isNumber(assembly)) {
                return res.status(400).json({ message: 'Parametro assembly non valido' });
            }
            if (!isNumber(member)) {
                return res.status(400).json({ message: 'Parametro member non valido' });
            }

            const assemblyEntity: Assemblea = await AssembleaRepository.findbyId(+assembly);
            const memberEntity: Socio = await SocioRepository.findbyId(+member);
            if (!assemblyEntity) {
                return res.status(400).json({ message: 'Assemblea non esistente' });
            }
            if (!memberEntity) {
                return res.status(400).json({ message: 'Socio non esistente' });
            }

            const newPresence: Presenza = await PresenzaRepository.createPresence(presenzaType, assemblyEntity, memberEntity);
            results.push(newPresence);
        }
        return res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('Errore nella scrittura sul database');
    }
});