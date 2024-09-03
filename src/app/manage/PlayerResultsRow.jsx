import DeleteButton from "../components/DeleteButton"
import RedTextButton from "../components/redbutton"
import WhiteTextButton from "../components/whitebutton"

export default function PlayerResultsRow (props) {

    function cell (e) {
        if (e == "" || e == null) {
            return (
                <span className="empty-cell">
                    (empty)
                </span>
            )
        } else {
            return e
        }
    }
    const resultsRow = props.data.map( (e) => <td className="results-cell">
        {cell(e)}
    </td>)
    return (
        <tr>
            {resultsRow}
            <td>
                <WhiteTextButton text="Edit"/>
                <DeleteButton onClick={() => {}}/>
            </td>
        </tr>
    )
}

