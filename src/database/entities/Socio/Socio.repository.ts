import { myDataSource } from "../../DataSource";
import { Socio } from "./Socio.entity";

export const SocioRepository = myDataSource.getRepository(Socio).extend({
    async findAll(): Promise<Socio[] | undefined> {
        return this.find()
    },

    async findbyId(id: number): Promise<Socio | undefined> {
        return this.findOne({
            where : {
                id : id
            }
        })
    },

    async setActive(member: Socio, active: boolean): Promise<Socio | undefined> {
        member.active = active
        return this.save(member)
    },

    async deleteById(id: number): Promise<void> {
        await this.delete({ id : id })
    },

    async createMember(name: string): Promise<Socio> {
        const newMember = await this.create({name : name})
        return this.save(newMember)
    },
})