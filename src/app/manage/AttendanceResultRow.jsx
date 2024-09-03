
export default function AttendanceResultRow (props) {
    const resultsRow = props.data.map( (e) => <td className="results-cell">
        {e}
    </td>)
    return (
        <tr>
            {resultsRow}
        </tr>
    )

}