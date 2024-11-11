import { DataSource } from "typeorm";
import { Test } from "./entities/Test/Test.entity";

export const myDataSource = new DataSource({
    type: "mysql", // change if needed
    host: "qr.jemore.it", // database ip
    port: 3306,
    username: "root", // insert database information
    password: "E4TpodDrmhy8P7w5lqaN",
    database: "assemblee",
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