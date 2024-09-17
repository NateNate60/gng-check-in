import { useState } from "react"

import EventSelection from "../components/EventSelection"
import RedTextButton from "../components/redbutton"

// Component that renders the dialogue to delete an event
export default function SubtractEventControl (props) {

    const [state, setState] = useState("")
    const [warning, setWarning] = useState("")
    const [confirmDelete, setConfirm] = useState(false)

    function subtractEvent () {
        if (!confirmDelete) {
            setConfirm(true)
            return
        }
        let urlParams = new URLSearchParams()
        urlParams.append("eid", state)
        if (warning != "") {
            urlParams.append("cascade", "true")
        }
        fetch(`http://localhost:8000/gng/event/rm?` + urlParams
        ).then( (e) => e.json()
        ).then( function (json) {
            if ("error" in json) {
                setWarning(json["error"])
            } else {
                setWarning("Deletion successful. Page will reload...")
                setTimeout( () => window.location.reload(), 5000)
            }
        })
        
    }

    function onChange (event) {
        setConfirm(false)
        setWarning("")
        setState(event.target.value)
    }

    return (
        <div>
            <h3>
                Delete an event category
            </h3>
            <p>
                Deleting an event will delete all attendance records for that event.
                <span className="error-text">
                    <br/>
                    {warning}<br/>
                    {warning == "Event has attendance records." ? "Press again to delete the event and all attendance records." : ""}
                </span>
            </p>
            <EventSelection events={props.events} onChange={ onChange }/>

            <span className="event-control-button">
                <RedTextButton text={confirmDelete ? "Confirm": "Delete"} onClick={subtractEvent}/>
            </span>
        </div>
    )
}