import { Player } from "@/types/Player"
import AttendanceResultRow from "./AttendanceResultRow"
import PlayerResultsRow from "./PlayerResultsRow"
import { AttendanceRecord } from "@/types/AttendanceRecord"
import { Events } from "@/types/Event"

interface SearchResultsProps {
    playerRecords: Array<Player>,
    attendanceRecords: Array<AttendanceRecord>,
    use: "players" | "attendance" | "",
    events: Events,
    eligiblePlayers: Array<number>
}


export default function SearchResults ({playerRecords, attendanceRecords, use, events, eligiblePlayers}: SearchResultsProps) {
    if (use === "") {
        return (
            <p>
                Use the &quot;search database&quot; button above to search the database. 
            </p>
        )
    }
    if (use === "attendance") {
        let resultRows = attendanceRecords.map( (e: AttendanceRecord) => <AttendanceResultRow key={`${e.date}:${e.eid}:${e.pid}`} 
            record={e} eventName={events[e.eid]}
        />)
        return (
            <table id="results-list">
                <thead>
                    <tr>
                        <th>
                            Result count:
                        </th>
                        <td id="row-count">
                            {attendanceRecords.length}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Given name
                        </th>
                        <th>
                            Surname
                        </th>
                        <th>
                            Pokemon ID
                        </th>
                        <th>
                            MHA Email
                        </th>
                        <th>
                            MTGA Email
                        </th>
                        <th>
                            Lorcana Email
                        </th>
                        <th>
                            Attendance date
                        </th>
                        <th>
                            Event type
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {resultRows}
                </tbody>
            </table>
        )
    } else {
        let resultRows = playerRecords.map( (e) => <PlayerResultsRow key={`PlayerResultsRow:${e.pid}`} record={e} pokeball={eligiblePlayers.includes(e.pid)}/>)
        return (
            <table id="results-list">
                <thead>
                    <tr>
                        <th>
                            Result count:
                        </th>
                        <td id="row-count">
                            {playerRecords.length}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            
                        </th>
                        <th>
                            Given name
                        </th>
                        <th>
                            Surname
                        </th>
                        <th>
                            Phone number
                        </th>
                        <th>
                            Birthdate
                        </th>
                        <th>
                            Parent name
                        </th>
                        <th>
                            Pokemon ID
                        </th>
                        <th>
                            MHA Email
                        </th>
                        <th>
                            MTGA Email
                        </th>
                        <th>
                            Lorcana Email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {resultRows}
                </tbody>
            </table>
        )
    }
}