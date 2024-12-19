import { AssembleaRepository } from "../database/entities/Assemblea/Assemblea.repository";
import { RigaRepository } from "../database/entities/Riga/Riga.repository";
import { Assemblea } from "../database/entities/Assemblea/Assemblea.entity";
import { Riga } from "../database/entities/Riga/Riga.entity";
import verifyToken from "../middleware/verifyToken";
import { Router, Request, Response } from "express";
import { checkParams, isNumber } from "../utils";
import checkId from "../middleware/checkiId";

export var router_riga: Router = Router()
router_riga.use(verifyToken)

router_riga.get('/', async (req: Request, res:Response) => {
    try {
        const result: Riga[] = await RigaRepository.findAll()
        return res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send('Errore nella lettura del database')
    }
})

router_riga.get('/:id', [checkId], async (req: Request, res:Response) => {
    try {
        const result: Riga = await  RigaRepository.findbyId(+req.params.id)
        return res.json(result)
    } catch {
        res.status(500).send('Errore nella lettura del database')
    }
})

router_riga.post('/', async (req: Request, res:Response) => {
    const params = ["text", "assembly"];
    if (!checkParams(req.body, params)) {
        return res.status(400).json({ message: 'Parametri nel body non validi' });
    }

    if (!isNumber(req.body["assembly"])) {
        return res.status(400).json({ message: 'Parametro assembly non valido' });
    }

    const assembly: Assemblea = await AssembleaRepository.findbyId(+req.body["assembly"])
    if (!assembly) {
        return res.status(400).json({ message: 'Assemblea non esistente' });
    }

    try {
        const newRiga: Riga = await RigaRepository.createRiga(req.body["text"], assembly)
        const result: Riga = await RigaRepository.save(newRiga)
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database')
    } 
})

router_riga.delete('/:id', [checkId],  async (req: Request, res:Response) => {
    try {
        const result = await RigaRepository.deleteById(+req.params.id)
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database')
    }
})

router_riga.get('/results/:id', [checkId], async (req: Request, res: Response) => {
    const rigaId = +req.params.id;  // Converti l'ID in un numero
  
    try {
        const results = await RigaRepository.getVotingResultByRigaId(rigaId);

        if (results === null) {
            return res.status(404).json({ message: 'Nessun voto trovato o Riga non esistente' });
        }

        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Errore nel calcolo del risultato delle votazioni');
    }
})