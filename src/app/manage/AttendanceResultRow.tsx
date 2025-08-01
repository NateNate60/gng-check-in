import { AttendanceRecord } from "@/types/AttendanceRecord"

interface AttendanceResultRowProps {
    record: AttendanceRecord,
    eventName: string
}

export default function AttendanceResultRow ({record, eventName}: AttendanceResultRowProps) {

    return (
        <tr>
            <td>
                {record.givenName}
            </td>
            <td>
                {record.surname}
            </td>
            <td className={record.pokemonID ? "" : "empty-cell"}>
                {record.pokemonID ? record.pokemonID : "(empty)"}
            </td>
            <td className={record.mhaID ? "" : "empty-cell"}>
                {record.mhaID ? record.mhaID : "(empty)"}
            </td>
            <td className={record.mtgID ? "" : "empty-cell"}>
                {record.mtgID ? record.mtgID : "(empty)"}
            </td>
            <td className={record.lorcanaID ? "" : "empty-cell"}>
                {record.lorcanaID ? record.lorcanaID : "(empty)"}
            </td>
            <td>
                {record.date}
            </td>
            <td>
                {eventName}
            </td>
        </tr>
    )

}