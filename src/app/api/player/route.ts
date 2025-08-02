import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise"
import { AccessCredentials } from "@/types/Access";
import { Events } from "@/types/Event";
import { Player } from "@/types/Player";

export async function GET (request: NextRequest) {
    const connection = await mysql.createConnection(AccessCredentials)

    let [results, packets] = await connection.query("SELECT * FROM Players")
    let players: Array<Player> = []
    for (let result of results) {
        players.push({
            pid: result["pid"],
            givenName: result["fname"],
            surname: result["lname"],
            phone: result["phone"],
            lorcanaID: result["email"],
            pokemonID: result["pokemon_id"],
            mhaID: result["mha_id"],
            mtgID: result["mtg_id"],
            birthdate: result["bday"],
            parentName: result["parent_name"]
        })
    }
    return new NextResponse(JSON.stringify(players), {status: 200})
    
}