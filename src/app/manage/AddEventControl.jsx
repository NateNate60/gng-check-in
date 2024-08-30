import { useState } from "react"

import GreenTextButton from "../components/greenbutton"

// Component that renders the dialogue to add a new event
export default function AddEventControl (props) {

    const [state, setState] = useState("")

    function add_event () {
        fetch(`http://localhost:8000/gng/event/new?` + new URLSearchParams()
            .append("event", state)
        ).then( (e) => e.json()
        ).then( (json) => props.callback(json))
    }

    return (
        <div >
            <h3>
                Add a new event category
            </h3>
            <label>Event name</label><br/>
            <input type="text" onChange={(e) => setState(e.target.value)}/>
            <span style={{float: "inline-end"}}>
                <GreenTextButton text="Add" onClick={add_event}/>
            </span>
        </div>
        
    )
}