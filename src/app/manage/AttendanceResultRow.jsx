
export default function AttendanceResultRow (props) {
    const resultsRow = props.data.map( (e) => <td key={`${props.data[0]}:${e}`} className="results-cell">
        {e}
    </td>)
    return (
        <tr>
            {resultsRow}
        </tr>
    )

}