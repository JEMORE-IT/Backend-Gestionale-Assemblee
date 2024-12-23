import { AssembleaRepository } from "../database/entities/Assemblea/Assemblea.repository";
import { DelegaRepository } from "../database/entities/Delega/Delega.repository";
import { SocioRepository } from "../database/entities/Socio/Socio.repository";
import { Assemblea } from "../database/entities/Assemblea/Assemblea.entity";
import { Delega } from "../database/entities/Delega/Delega.entity";
import { Socio } from "../database/entities/Socio/Socio.entity";
import { Router, Request, Response } from "express";
import verifyToken from "../middleware/verifyToken";
import { checkParams, isNumber } from "../utils";
import checkId from "../middleware/checkiId";

export var router_delegation: Router = Router()
router_delegation.use(verifyToken)

router_delegation.get('/', async (req: Request, res:Response) => {
    try {
        const result: Delega[] = await DelegaRepository.findAll()
        return res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send('Errore nella lettura del database')
    }
})

router_delegation.get('/:id', [checkId], async (req: Request, res: Response) => {
    try {
        const result: Delega = await  DelegaRepository.findbyId(+req.params.id)
        return res.json(result)
    } catch {
        res.status(500).send('Errore nella lettura del database')
    }
})

router_delegation.get('/assembly/:id', [checkId], async (req: Request, res: Response) => {
    const assemblyId = +req.params.id;

    try {
        const assembly = await AssembleaRepository.findbyId(assemblyId);
        if (!assembly) {
            return res.status(404).json({ message: 'Assemblea non trovata' });
        }

        const deleghe = await DelegaRepository.findByAssemblyId(assemblyId);
        return res.json(deleghe);
    } catch (err) {
        console.log(err);
        res.status(500).send('Errore nella lettura del database');
    }
});

router_delegation.post('/', async (req: Request, res: Response) => {
    const params = ["assembly", "delegante", "delegato"];
    if (!checkParams(req.body, params)) {
        return res.status(400).json({ message: 'Parametri nel body non validi' });
    }

    if (!isNumber(req.body["assembly"])) {
        return res.status(400).json({ message: 'Parametro assembly non valido' });
    }
    if (!isNumber(req.body["delegante"])) {
        return res.status(400).json({ message: 'Parametro delegante non valido' });
    }
    if (!isNumber(req.body["delegato"])) {
        return res.status(400).json({ message: 'Parametro delegato non valido' });
    }

    if (req.body["delegato"] == req.body["delegante"]) {
        return res.status(400).json({ message: 'Delegante e delegato devono essere persone distinte' });
    }

    const assembly: Assemblea = await AssembleaRepository.findbyId(+req.body["assembly"])
    const delegante: Socio = await SocioRepository.findbyId(+req.body["delegante"])
    const delegato: Socio = await SocioRepository.findbyId(+req.body["delegato"])
    if (!assembly) {
        return res.status(400).json({ message: 'Assemblea non esistente' });
    }
    if (!delegante) {
        return res.status(400).json({ message: 'Delegante non esistente' });
    }
    if (!delegato) {
        return res.status(400).json({ message: 'Delegato non esistente' });
    }

    try {
        const newDelegation: Delega = await DelegaRepository.createDelega(assembly, delegante, delegato)
        const result: Delega = await DelegaRepository.save(newDelegation)
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database')
    }  
});

router_delegation.post('/bulk-create', async (req: Request, res: Response) => {
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ message: 'Il body deve essere un array' });
    }

    try {
        const deleghe = req.body;
        const results = [];
        for (const delega of deleghe) {
            const { assembly, delegante, delegato } = delega;

            if (!isNumber(assembly)) {
                return res.status(400).json({ message: 'Parametro assembly non valido' });
            }
            if (!isNumber(delegante)) {
                return res.status(400).json({ message: 'Parametro delegante non valido' });
            }
            if (!isNumber(delegato)) {
                return res.status(400).json({ message: 'Parametro delegato non valido' });
            }
            if (delegante === delegato) {
                return res.status(400).json({ message: 'Delegante e delegato devono essere persone distinte' });
            }

            const assemblyEntity: Assemblea = await AssembleaRepository.findbyId(+assembly);
            const deleganteEntity: Socio = await SocioRepository.findbyId(+delegante);
            const delegatoEntity: Socio = await SocioRepository.findbyId(+delegato);
            if (!assemblyEntity) {
                return res.status(400).json({ message: 'Assemblea non esistente' });
            }
            if (!deleganteEntity) {
                return res.status(400).json({ message: 'Delegante non esistente' });
            }
            if (!delegatoEntity) {
                return res.status(400).json({ message: 'Delegato non esistente' });
            }

            const newDelega: Delega = await DelegaRepository.createDelega(assemblyEntity, deleganteEntity, delegatoEntity);
            results.push(newDelega);
        }
        return res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send('Errore nella scrittura sul database');
    }
});

router_delegation.delete('/:id', [checkId], async (req: Request, res: Response) => {
    try {
        const result = await DelegaRepository.deleteById(+req.params.id);
        return res.json(result);
    } catch {
        res.status(500).send('Errore nella scrittura sul database');
    }
});