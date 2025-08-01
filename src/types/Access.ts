import { ConnectionOptions } from "mysql2";

export const AccessCredentials: ConnectionOptions = {
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}