import { myDataSource } from "../../DataSource";
import { Assemblea } from "../Assemblea/Assemblea.entity";
import { Riga } from "./Riga.entity";
import { VoteType } from "../Voto/Voto.entity";

export const RigaRepository = myDataSource.getRepository(Riga).extend({
    async findAll(): Promise<Riga[] | undefined> {
        return this.find({
            relations: {
                votes: true
            }
        })
    },

    async findbyId(id: number): Promise<Riga | undefined> {
        return this.findOne({
            where : {
                id : id
            }
        })
    },

    async deleteById(id: number): Promise<void> {
        await this.delete({ id : id })
    },

    async createRiga(text: string, assembly: Assemblea): Promise<Riga> {
        const newRiga = await this.create({ text: text, assembly: assembly })
        return this.save(newRiga)
    },

    async getVotingResultByRigaId(rigaId: number): Promise<{ favorevoli: number, contrari: number, astenuti: number } | null> {
        const riga = await this.findOne({
            where: { id: rigaId },
            relations: { votes: true },
        });

        if (!riga) return null;  // Se la riga non esiste, restituisci null

        if (riga.votes.length === 0) {
            return null;  // Se non ci sono voti, restituisci null
        }

        const results = { favorevoli: 0, contrari: 0, astenuti: 0 };

        riga.votes.forEach(voto => {
            switch (voto.vote) {
                case VoteType.favorevole:
                    results.favorevoli += 1;
                    break;
                case VoteType.contrario:
                    results.contrari += 1;
                    break;
                case VoteType.astenuto:
                    results.astenuti += 1;
                    break;
            }
        });

        return results;
    },
})