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
    let [result, packets] = await connection.query<any>("UPDATE Settings SET value = ? WHERE setting = 'active_event'", eid)
    connection.end()
    if (result.affectedRows != 1) {
        return new NextResponse('{"error": "An unknown database error has occurred"}')
    }
    return new NextResponse('{}', {status: 200})
}

export async function GET (request: NextRequest) {
    
    const connection = await mysql.createConnection(AccessCredentials)
    let [results, packets] = await connection.query<any>("SELECT * FROM Events")
    let events: Events = {}
    for (let result of results) {
        events[result["event_type"]] = result["event_name"]
    }
    [results, packets] = await connection.query<any>("SELECT value FROM Settings WHERE setting = 'active_event'")
    connection.end()
    for (let result of results) {
        return new NextResponse(JSON.stringify({
            events: events,
            activeEvent: new Number(result["value"])
        }), {status: 200})
    }
}

export async function PUT (request: NextRequest) {
    let eventName = request.nextUrl.searchParams.get("name")

    if (!eventName) {
        return new NextResponse(JSON.stringify({"error": "No name provided"}), {status: 401})
    }

    const connection = await mysql.createConnection(AccessCredentials)

    let [result, packets] = await connection.query<any>("INSERT INTO Events VALUES (NULL, ?)", eventName)
    connection.end()

    if (result.affectedRows !== 1) {
        return new NextResponse('{"error": "An unknown server error has occurred."}', {status: 201})
    }

    return new NextResponse("{}", {status: 201})
}

export async function DELETE (request: NextRequest) {
    let eventName = request.nextUrl.searchParams.get("eid")

    if (!eventName) {
        return new NextResponse(JSON.stringify({"error": "No event ID provided"}), {status: 401})
    }

    const connection = await mysql.createConnection(AccessCredentials)

    await connection.query<any>("DELETE FROM EventAttendance WHERE event_type = ?", eventName)
    let [result, packets] = await connection.query<any>("DELETE FROM Events WHERE event_type = ?", eventName)
    connection.end()
    
    if (result.affectedRows !== 1) {
        return new NextResponse('{"error": "An unknown server error has occurred."}', {status: 201})
    }

    return new NextResponse("{}", {status: 200})
}