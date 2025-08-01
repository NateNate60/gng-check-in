import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise"
import { AccessCredentials } from "@/types/Access";
import { Events } from "@/types/Event";
import { Player } from "@/types/Player";
import { AttendanceRecord } from "@/types/AttendanceRecord";

export async function GET (request: NextRequest) {
    const connection = await mysql.createConnection(AccessCredentials)

    let eid = request.nextUrl.searchParams.get("eid")
    let date = request.nextUrl.searchParams.get("date")
    let queryString = ""
    if (eid && date) {
        // Both EID and Date are given
        // Show attendance for events of EID, in the month given by DATE
        queryString = "SELECT Players.pid, Players.fname, Players.lname, Players.pokemon_id, Players.mha_id, Players.mtg_id, Players.email, EventAttendance.event_date, EventAttendance.event_type " +
                      "FROM Players INNER JOIN EventAttendance ON Players.pid = EventAttendance.pid " +
                      "WHERE EventAttendance.event_type = ? AND event_date LIKE CONCAT(?, '%')"
        var values = [eid, date]
    } else if (eid) {
        // EID given but date not given
        // Show all attendance for events of EID on any date
        queryString = "SELECT Players.pid, Players.fname, Players.lname, Players.pokemon_id, Players.mha_id, Players.mtg_id, Players.email, EventAttendance.event_date, EventAttendance.event_type " +
                      "FROM Players INNER JOIN EventAttendance ON Players.pid = EventAttendance.pid " +
                      "WHERE EventAttendance.event_type = ?"
        var values = [eid]
    } else if (date) {
        // Date given but not EID
        // Show all attendance records for all events occurring on that date
        queryString = "SELECT Players.pid, Players.fname, Players.lname, Players.pokemon_id, Players.mha_id, Players.mtg_id, Players.email, EventAttendance.event_date, EventAttendance.event_type " +
                      "FROM Players INNER JOIN EventAttendance ON Players.pid = EventAttendance.pid " +
                      "WHERE event_date = ?"
        var values = [date]
    } else {
        // Neither EID nor date given
        // Show all attendance records 
        queryString = "SELECT Players.pid, Players.fname, Players.lname, Players.pokemon_id, Players.mha_id, Players.mtg_id, Players.email, EventAttendance.event_date, EventAttendance.event_type " +
                      "FROM Players INNER JOIN EventAttendance ON Players.pid = EventAttendance.pid "
    }

    let [results, packets] = await connection.query(queryString, values)
    let records: Array<AttendanceRecord> = []
    for (let result of results) {
        records.push({
            givenName: result["fname"],
            surname: result["lname"],
            lorcanaID: result["email"],
            pokemonID: result["pokemon_id"],
            mhaID: result["mha_id"],
            mtgID: result["mtg_id"],
            pid: result["pid"],
            eid: result["event_type"]
        })
    }
    return new NextResponse(JSON.stringify(records), {status: 200})
}