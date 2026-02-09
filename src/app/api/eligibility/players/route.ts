import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise"
import { AccessCredentials } from "@/types/Access";

export async function GET (request: NextRequest) {
    const connection = await mysql.createConnection(AccessCredentials)
    
    let [response, packets] = await connection.query<any>("SELECT value FROM Settings WHERE setting = 'pokeball_days'")

    let cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - Number(response[0]["value"]))

    let [response2, packets2] = await connection.query<any>("SELECT pid FROM " +
                                                       "(SELECT pid, COUNT(pid) AS pid_count FROM EventAttendance " +
                                                       "WHERE event_date >= ? "+ 
                                                       "AND event_type = (SELECT value FROM Settings WHERE setting = 'pokeball_event') " +
                                                       "GROUP BY pid) AS AttendanceCount " +
                                                       "WHERE AttendanceCount.pid_count >= (SELECT value FROM Settings WHERE setting = 'pokeball_count')",
                                                       cutoff.toISOString().slice(0, 10))
    
    await connection.end()
    return new NextResponse(JSON.stringify(response2.map( (value) => value.pid)))
}