import { useState } from "react"

import GreenTextButton from "../components/greenbutton"

const config = require("@/config.json")

// Component that renders the dialogue to add a new event
export default function AddEventControl () {

    const [name, setName] = useState<string>("")
    const [warning, setWarning] = useState<string>("")

    function addEvent () {
        let params = new URLSearchParams()
        params.append("name", name)
        fetch(`/api/event?${params}`
        , {
            method: "PUT"
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
            <p className="error-text">
                {warning}
            </p>
            <label>Event name</label><br/>
            <input type="text" onChange={(e) => setName(e.target.value)}/>
            <span className="event-control-button">
                <GreenTextButton text="Add" onClick={addEvent}/>
            </span>
        </div>
        
    )
}