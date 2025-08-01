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
            <td className={record.pokemonID ? "" : "empty"}>
                {record.pokemonID ? record.pokemonID : "(empty)"}
            </td>
            <td className={record.mhaID ? "" : "empty"}>
                {record.mhaID ? record.mhaID : "(empty)"}
            </td>
            <td className={record.mtgID ? "" : "empty"}>
                {record.mtgID ? record.mtgID : "(empty)"}
            </td>
            <td className={record.lorcanaID ? "" : "empty"}>
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