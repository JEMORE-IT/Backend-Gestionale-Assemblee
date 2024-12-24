import { myDataSource } from "../../DataSource";
import { Assemblea } from "./Assemblea.entity";

export const AssembleaRepository = myDataSource.getRepository(Assemblea).extend({
    async findAll(): Promise<Assemblea[] | undefined> {
        return this.find({
            relations : {
                presenze: {
                    member: true
                },
                deleghe: {
                    delegante: true,
                    delegato: true
                },
                righe: true
            }
        })
    },
    
    async findbyId(id: number): Promise<Assemblea | undefined> {
        return this.findOne({
            where : {
                id : id
            },
            relations : {
                presenze: {
                    member: true
                },
                deleghe: {
                    delegante: true,
                    delegato: true
                },
                righe: {
                    votes: {
                        member: true
                    }
                }
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

    async updateAssembly(id: number, data: Partial<Assemblea>): Promise<Assemblea | undefined> {
        const assembly = await this.findOne({ where: { id } });
        if (!assembly) {
            throw new Error(`Assemblea con ID ${id} non trovata`);
        }

        Object.assign(assembly, data);
        return this.save(assembly);
    },
})