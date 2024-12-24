import { Router, Request, Response } from "express";
import { AssembleaRepository } from "../database/entities/Assemblea/Assemblea.repository";
import { RigaRepository } from "../database/entities/Riga/Riga.repository";
import { PresenceType } from "../database/entities/Presenza/Presenza.entity";

export var router_download: Router = Router();

router_download.get('/:id', async (req: Request, res: Response) => {
    const assemblyId = +req.params.id;

    try {
        const assembly = await AssembleaRepository.findbyId(assemblyId);
        if (!assembly) {
            return res.status(404).json({ message: 'Assemblea non trovata' });
        }

        let verbale = `Verbale dell'assemblea del ${assembly.date}\n\n`;
        verbale += `Luogo: ${assembly.luogo}\n`;
        verbale += `Scopo: ${assembly.scopo}\n`;
        verbale += `Orario di costituzione: ${assembly.orarioCostituzione}\n`;
        verbale += `Orario di scioglimento: ${assembly.orarioScioglimento}\n\n`;

        const presentiSala = assembly.presenze.filter(p => p.presenza === PresenceType.presente);
        const presentiOnline = assembly.presenze.filter(p => p.presenza === PresenceType.online);
        const assenti = assembly.presenze.filter(p => p.presenza === PresenceType.assente || p.presenza === PresenceType.delega);

        verbale += `Presenti in sala (${presentiSala.length}):\n`;
        presentiSala.forEach(presenza => {
            verbale += `- ${presenza.member.name}\n`;
        });

        verbale += `\nPresenti da remoto su Microsoft Teams (${presentiOnline.length}):\n`;
        presentiOnline.forEach(presenza => {
            verbale += `- ${presenza.member.name}\n`;
        });

        verbale += `\nAssenti (${assenti.length}):\n`;
        assenti.forEach(presenza => {
            verbale += `- ${presenza.member.name}\n`;
        });

        verbale += `\nDeleghe:\n`;
        assembly.deleghe.forEach(delega => {
            verbale += `- ${delega.delegante.name} delega ${delega.delegato.name}\n`;
        });

        verbale += `\nOrdine del giorno:\n`;
        for (let i = 0; i < assembly.righe.length; i++) {
            const riga = assembly.righe[i];
            verbale += `${i + 1}. ${riga.text}\n`;
            const results = await RigaRepository.getVotingResultByRigaId(riga.id);
            if (results) {
                verbale += `  Risultati:\n`;
                verbale += `  - Favorevoli: ${results.favorevoli}\n`;
                verbale += `  - Contrari: ${results.contrari}\n`;
                verbale += `  - Astenuti: ${results.astenuti}\n`;
            }
        }

        res.setHeader('Content-Disposition', `attachment; filename=verbale_${assembly.date}.txt`);
        res.setHeader('Content-Type', 'text/plain');
        res.send(verbale);
    } catch (error) {
        console.error('Errore durante la generazione del verbale:', error);
        res.status(500).send('Errore nella generazione del verbale');
    }
});