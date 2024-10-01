import DeleteButton from "../components/DeleteButton"
import RedTextButton from "../components/redbutton"
import WhiteTextButton from "../components/whitebutton"

const config = require("@/config.json")

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
        fetch(`http://${config['domain']}/player/rm?` + urlParams, {
            method: "DELETE"
        }
        ).then( (r) => r.json()
        ).then( (json) => console.log(json))
    }

    const resultsRow = props.data.map( (e) => <td key={`${props.data[0]}:${e}`} className="results-cell">
        {cell(e)}
    </td>)
    return (
        <tr>
            {resultsRow}
            <td>
                <WhiteTextButton text="Edit" href={"/manage/edit?pid=" + props.data[0]} target="_blank"/>
                <DeleteButton onClick={deletePlayer}/>
            </td>
        </tr>
    )
}

