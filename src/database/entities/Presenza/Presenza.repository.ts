import { PresenceType, Presenza } from "./Presenza.entity";
import { Assemblea } from "../Assemblea/Assemblea.entity";
import { myDataSource } from "../../DataSource";
import { Socio } from "../Socio/Socio.entity";

export const PresenzaRepository = myDataSource.getRepository(Presenza).extend({
    async findAll(): Promise<Presenza[] | undefined> {
        return this.find({
            relations : {
                assembly : true,
                member : true
            }
        })
    },

    async findbyId(id: number): Promise<Presenza | undefined> {
        return this.findOne({
            where : {
                id : id
            },
            relations : {
                assembly : true,
                member : true
            }
        })
    },

    async deleteById(id: number): Promise<void> {
        await this.delete({ id : id })
    },

    async createPresence(presenza: PresenceType, assembly: Assemblea, member: Socio): Promise<Presenza> {
        const newPresence = await this.create({ presenza: presenza, assembly: assembly, member: member })
        return this.save(newPresence)
    },
})