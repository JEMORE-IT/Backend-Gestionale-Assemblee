import { myDataSource } from "../../DataSource";
import { Assemblea } from "../Assemblea/Assemblea.entity";
import { Socio } from "../Socio/Socio.entity";
import { Delega } from "./Delega.entity";

export const DelegaRepository = myDataSource.getRepository(Delega).extend({
    async findAll(): Promise<Delega[] | undefined> {
        return this.find({
            relations: {
                assembly: true,
                delegante: true,
                delegato: true
            }
        })
    },

    async findbyId(id: number): Promise<Delega | undefined> {
        return this.findOne({
            where : {
                id : id
            },
            relations: {
                assembly: true,
                delegante: true,
                delegato: true
            }
        })
    },

    async deleteById(id: number): Promise<void> {
        await this.delete({ id : id })
    },

    async createDelega(assembly: Assemblea, delegante: Socio, delegato: Socio): Promise<Delega> {
        const newDelega = await this.create({assembly: assembly, delegante: delegante, delegato:delegato})
        return this.save(newDelega)
    },
})