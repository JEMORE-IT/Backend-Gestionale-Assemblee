import { myDataSource } from "../../DataSource";
import { Test } from "./Test.entity";

export const TestRepository = myDataSource.getRepository(Test).extend({
    getTest() {
        return this.find()
    }
})