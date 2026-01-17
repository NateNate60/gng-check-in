import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise"
import { AccessCredentials } from "@/types/Access";
import { Player } from "@/types/Player";

export async function GET (request: NextRequest) {
    let pid = request.nextUrl.searchParams.get("pid")

    const connection = await mysql.createConnection(AccessCredentials)

    let query = "SELECT * FROM Players"
    if (pid) {
        query += " WHERE pid = ?"
    }

    let [results, packets] = await connection.query<any>(query, pid ?? undefined)
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

export async function DELETE (request: NextRequest) {

    let pid = request.nextUrl.searchParams.get("pid")

    if (!pid) {
        return new NextResponse(JSON.stringify({"error": "No pid provided"}), {status: 401})
    }

    const connection = await mysql.createConnection(AccessCredentials)

    let [results, packets] = await connection.query<any>("DELETE FROM Players WHERE pid = ?", pid)
    if (results.affectedRows !== 1) {
        return new NextResponse('{"error": "An unknown error has occurred"}', {status: 500})
    }
    return new NextResponse('{}', {status: 200})
    
}

export async function PATCH (request: NextRequest) {
    let data: Player = await request.json()
    if (!Object.keys(data).includes('pid')) {
        return new NextResponse('{"error": "pid not provided"}')
    }

    const connection = await mysql.createConnection(AccessCredentials)

    let [results, packets] = await connection.query<any>("UPDATE Players SET fname = ?, lname = ?, " +
                                                    "phone = ?, bday = ?, parent_name = ?, " + 
                                                    "pokemon_id = ?, mha_id = ?, mtg_id = ?, email = ? " +
                                                    "WHERE pid = ?",
                                                    [
                                                        data.givenName,
                                                        data.surname,
                                                        data.phone,
                                                        data.birthdate,
                                                        data.parentName,
                                                        data.pokemonID,
                                                        data.mhaID,
                                                        data.mtgID,
                                                        data.lorcanaID,
                                                        data.pid
                                                    ])
    if (results.affectedRows !== 1) {
        return new NextResponse('{"error": "Database error"}', {status: 500})
    }
    return new NextResponse('{}', {status: 200})

} 