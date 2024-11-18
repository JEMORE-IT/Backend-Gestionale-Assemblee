import { myDataSource } from "../../DataSource";
import { Assemblea } from "../Assemblea/Assemblea.entity";
import { Riga } from "./Riga.entity";

export const RigaRepository = myDataSource.getRepository(Riga).extend({
    async findAll(): Promise<Riga[] | undefined> {
        return this.find()
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
})