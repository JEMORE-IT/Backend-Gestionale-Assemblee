import { myDataSource } from "../../DataSource";
import { Riga } from "../Riga/Riga.entity";
import { Socio } from "../Socio/Socio.entity";
import { VoteType, Voto } from "./Voto.entity";

export const VotoRepository = myDataSource.getRepository(Voto).extend({
    async findAll(): Promise<Voto[] | undefined> {
        return this.find()
    },

    async findbyId(id: number): Promise<Voto | undefined> {
        return this.findOne({
            where : {
                id : id
            }
        })
    },

    async deleteById(id: number): Promise<void> {
        await this.delete({ id : id })
    },

    async createVote(vote: VoteType, member: Socio, riga: Riga): Promise<Voto> {
        const newMember = await this.create({vote : vote, member: member, riga: riga})
        return this.save(newMember)
    },
})