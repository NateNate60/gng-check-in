import { useState } from "react"

import GreenTextButton from "../components/greenbutton"

const config = require("@/config.json")

// Component that renders the dialogue to add a new event
export default function AddEventControl (props) {

    const [state, setState] = useState("")
    const [warning, setWarning] = useState("")

    function addEvent () {
        let formData = new FormData()
        formData.append("ename", state)
        fetch(`${config["domain"]}/event/new?`
        , {
            method: "POST",
            body: formData
        }
        ).then( (e) => e.json()
        ).then( function (json) {
            if ("error" in json) {
                setWarning(json["error"])
            } else {
                setWarning("Addition successful. Page will reload...")
                setTimeout( () => window.location.reload(), 5000)
            }
        })
    }

    return (
        <div >
            <h3>
                Add a new event category
            </h3>
            <p>
                {warning}
            </p>
            <label>Event name</label><br/>
            <input type="text" onChange={(e) => setState(e.target.value)}/>
            <span className="event-control-button">
                <GreenTextButton text="Add" onClick={addEvent}/>
            </span>
        </div>
        
    )
}