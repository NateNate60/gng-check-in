import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise"
import { AccessCredentials } from "@/types/Access";

export async function GET (request: NextRequest) {
    const connection = await mysql.createConnection(AccessCredentials)

    let [results, packets] = await connection.query("SELECT value FROM Settings WHERE setting IN ('pokeball_count', 'pokeball_days', 'pokeball_event')")

    return new NextResponse(JSON.stringify({
        count: results[0]["value"],
        days: results[1]["value"],
        event: results[2]["value"]
    }))
}

export async function PUT (request: NextRequest) {
    let data = await request.json()

    if (!("eid" in data && "days" in data && "count" in data)) {
        return new NextResponse('{"error": "Missing required fields"}', {status: 400})
    }

    const connection = await mysql.createConnection(AccessCredentials)

    let count = Number(data["count"])
    let days = Number(data["days"])
    let eid = Number(data["eid"])

    await connection.query("UPDATE Settings SET value = ? WHERE setting = 'pokeball_count'", count)
    await connection.query("UPDATE Settings SET value = ? WHERE setting = 'pokeball_days'", days)
    await connection.query("UPDATE Settings SET value = ? WHERE setting = 'pokeball_event'", eid)

    return new NextResponse('{}')
}