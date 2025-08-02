import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise"
import { AccessCredentials } from "@/types/Access";
import { Events } from "@/types/Event";

export async function PATCH (request: NextRequest) {
    let eid = request.nextUrl.searchParams.get("eid")
    if (!eid || Number.isNaN(Number(eid))) {
        return new NextResponse('{"error": "No event ID provided"}', {status: 400})
    }
    
    const connection = await mysql.createConnection(AccessCredentials)
    let [result, packets] = await connection.query("UPDATE Settings SET value = ? WHERE setting = 'active_event'", eid)
    if (result.affectedRows != 1) {
        return new NextResponse('{"error": "An unknown database error has occurred"}')
    }
    return new NextResponse('{}', {status: 204})
}

export async function GET (request: NextRequest) {
    
    const connection = await mysql.createConnection(AccessCredentials)
    let [results, packets] = await connection.query("SELECT * FROM Events")
    let events: Events = {}
    for (let result of results) {
        events[result["event_type"]] = result["event_name"]
    }
    [results, packets] = await connection.query("SELECT value FROM Settings WHERE setting = 'active_event'")
    for (let result of results) {
        return new NextResponse(JSON.stringify({
            events: events,
            activeEvent: new Number(result["value"])
        }), {status: 200})
    }
}