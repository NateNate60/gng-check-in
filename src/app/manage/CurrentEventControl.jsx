import EventSelection from "../components/EventSelection"
import WhiteTextButton from "../components/whitebutton"

// Component that renders the dialogue to change the current active event
export default function CurrentEventControl (props) {

    function changeEvent (eid) {
        let urlParams = new URLSearchParams()
        urlParams.append("eid", eid)
        fetch("http://localhost:8000/gng/event/change?" + urlParams,
            {
                method: "PATCH"
            }
        )
    }

    return (
        <div>
            <h3>
                Change current event
            </h3>
            <p>
                The current event determines which event players are checked in to.
            </p>
            <span style={{float: "inline-start"}}>
                <EventSelection events={props.events} onChange={ (e) => changeEvent(e.target.value) }/>
            </span>
            <p className="right-align">
                (saves automatically)
            </p>
        </div>
    )
}