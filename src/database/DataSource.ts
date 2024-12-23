import { Assemblea } from "./entities/Assemblea/Assemblea.entity";
import { Delega } from "./entities/Delega/Delega.entity";
import { Presenza } from "./entities/Presenza/Presenza.entity";
import { Socio } from "./entities/Socio/Socio.entity";
import { Voto } from "./entities/Voto/Voto.entity";
import { Riga } from "./entities/Riga/Riga.entity";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

export const myDataSource = new DataSource({
    type: "mysql", // change if needed
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        Assemblea, Socio, Presenza, Delega, Voto, Riga
    ],
    logging: true, // set to false in production
    synchronize: true, // set to false in production
    extra: {
        poolSize: 20,
        connectionTimeoutMillis: 2000,
        query_timeout: 1000,
        statement_timeout: 1000
    }
});