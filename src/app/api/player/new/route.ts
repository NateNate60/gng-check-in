import { Player } from "@/types/Player"
import { AccessCredentials } from "@/types/Access"
import mysql from  'mysql2/promise';
import { config } from "dotenv";

export async function POST (request: Request) {
    let newPlayer: Player = await request.json()
    
    const connection = await mysql.createConnection(AccessCredentials)

    let [result, packets] = await connection.query("INSERT INTO Players VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        newPlayer.givenName,
        newPlayer.surname,
        newPlayer.phone,
        newPlayer.lorcanaID,
        newPlayer.birthdate,
        newPlayer.parentName,
        newPlayer.pokemonID,
        newPlayer.mhaID,
        newPlayer.mtgID
    ])

    if (result.affectedRows === 1) {
        let attendenceQuery = await connection.query("INSERT INTO EventAttendance VALUES ((SELECT MAX(pid) FROM Players), (SELECT CURDATE()), (SELECT value FROM Settings WHERE setting = 'active_event')) ")
        return new Response(JSON.stringify({"success": true}))
    }

    return new Response(JSON.stringify({}), { status: 500 })
}