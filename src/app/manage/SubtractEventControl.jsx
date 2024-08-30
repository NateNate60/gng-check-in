import { useState } from "react"

import EventSelection from "../components/EventSelection"
import RedTextButton from "../components/redbutton"

// Component that renders the dialogue to delete an event
export default function SubtractEventControl (props) {

    const [state, setState] = useState("")
    const [warning, setWarning] = useState("")
    const [confirm_delete, setConfirm] = useState(false)

    function subtract_event () {
        if (!confirm_delete) {
            setConfirm(true)
            return
        }
        let url_params = new URLSearchParams()
        url_params.append("event", state)
        if (warning != "") {
            url_params.append("cascade", "true")
        }
        fetch(`http://localhost:8000/gng/event/rm?` + url_params
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

    function on_change (event) {
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
            <EventSelection events={['1', '-1']} onChange={ on_change }/>

            <span style={{float: "inline-end"}}>
                <RedTextButton text={confirm_delete ? "Confirm": "Delete"} onClick={subtract_event}/>
            </span>
        </div>
    )
}