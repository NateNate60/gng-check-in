import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise'
import { AccessCredentials } from "@/types/Access";

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