import { DataSource } from "typeorm";
import { Test } from "./entities/Test/Test.entity";

export const myDataSource = new DataSource({
    type: "mysql", // change if needed
    host: "", // database ip
    port: 3306,
    username: "", // insert database information
    password: "",
    database: "",
    entities: [
        Test
    ],
    logging: true, // set to false in production
    synchronize: true, // set to false in production
    extra: {
        poolSize: 20,
        connectionTimeoutMillis: 2000,
        query_timeout: 1000,
        statement_timeout: 1000
    }
})