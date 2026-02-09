import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise'
import { AccessCredentials } from "@/types/Access";

export async function GET (request: NextRequest) {
    let pid = request.nextUrl.searchParams.get("pid")

    if (!pid) {
        return new NextResponse(JSON.stringify({"error": "No PID provided"}))
    }

    const connection = await mysql.createConnection(AccessCredentials)

    let [result, packets] = await connection.query<any>("INSERT INTO EventAttendance VALUES (?, CURDATE(), (SELECT value FROM Settings WHERE setting = 'active_event'));", pid)
    await connection.end()
    
    if (result.affectedRows == 1) {
        return new NextResponse(JSON.stringify({}))
    }
    return new NextResponse(JSON.stringify({"error": "Duplicate check-in"}))
}
