import PlayerResultsRow from "./PlayerResultsRow"

export default function SearchResults (props) {
    if (typeof props.results != "object") {
        return (
            <p>
                Use the "search database" button above to search the database. 
            </p>
        )
    }
    if (props.results["type"] == "attendance") {
        let resultRows = props.results["data"].map( (e) => <tr>
            <PlayerResultsRow data={e}/>
        </tr>)
        return (
            <table className="results-list" style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th>
                            Result count:
                        </th>
                        <td>
                            {props.results["data"].length}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            pid
                        </th>
                        <th>
                            Given name
                        </th>
                        <th>
                            Surname
                        </th>
                        <th>
                            Attendance date
                        </th>
                        <th>
                            Event category
                        </th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        )
    } else {
        let resultRows = props.results["data"].map( (e) => <PlayerResultsRow data={e}/>)
        return (
            <table className="results-table" style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th>
                            Result count:
                        </th>
                        <td style={{textAlign: "center"}}>
                            {props.results["data"].length}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            pid
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