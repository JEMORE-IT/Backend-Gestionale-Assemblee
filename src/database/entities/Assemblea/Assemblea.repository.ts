import { myDataSource } from "../../DataSource";
import { Assemblea } from "./Assemblea.entity";

export const AssembleaRepository = myDataSource.getRepository(Assemblea).extend({
    async findAll(): Promise<Assemblea[] | undefined> {
        return this.find()
    },
    
    async findbyId(id: number): Promise<Assemblea | undefined> {
        return this.findOne({
            where : {
                id : id
            }
        })
    },

    async deleteById(id: number): Promise<void> {
        await this.delete({ id : id })
    },

    async createAssembly(date: Date): Promise<Assemblea> {
        const newAssembly = await this.create({date : date})
        return this.save(newAssembly)
    },
})