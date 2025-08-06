import { Player } from "@/types/Player"
import DeleteButton from "../components/DeleteButton"
import RedTextButton from "../components/redbutton"
import WhiteTextButton from "../components/whitebutton"


interface PlayerResultsRowProps {
    record: Player
}

export default function PlayerResultsRow ({record}: PlayerResultsRowProps) {
    let params = new URLSearchParams()
    params.append("pid", record.pid.toString())
    return (
        <tr>
            <td>
                {record.pid}
            </td>
            <td>
                {record.givenName}
            </td>
            <td>
                {record.surname}
            </td>
            <td>
                {record.phone}
            </td>
            <td>
                {record.birthdate}
            </td>
            <td className={record.parentName ? "" : "empty-cell"}>
                {record.parentName ? record.parentName : "(empty)"}
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
                <WhiteTextButton text="Edit" href={`/manage/edit/?${params}`} target="_blank"/>
                <DeleteButton onClick={() => {
                    let params = new URLSearchParams()
                    params.append("pid", record.pid.toString())
                    fetch(`/api/player?` + params, {
                        method: "DELETE"
                    })
                }}/>
            </td>
        </tr>
    )
}

