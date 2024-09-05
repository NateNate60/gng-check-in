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

    function deletePlayer () {
        let urlParams =  new URLSearchParams()
        urlParams.append("pid", props.data[0])
        fetch("http://localhost:8000/gng/player/rm?" + urlParams, {
            method: "DELETE"
        }
        ).then( (r) => r.json()
        ).then( (json) => console.log(json))
    }

    const resultsRow = props.data.map( (e) => <td className="results-cell">
        {cell(e)}
    </td>)
    return (
        <tr>
            {resultsRow}
            <td>
                <WhiteTextButton text="Edit"/>
                <DeleteButton onClick={deletePlayer}/>
            </td>
        </tr>
    )
}

