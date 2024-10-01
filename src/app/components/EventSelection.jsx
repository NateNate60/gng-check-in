"use client"
import { useEffect, useState } from "react"

const config = require("@/config.json")

export default function EventSelection (props) {
    if (!"events" in props) {
        return
    }

    const [currentEvent, setCurrentEvent] = useState(null)

    useEffect( function () {
        fetch(`http://${config["domain"]}/event/current`
        ).then( (r) => r.json()
        ).then( (json) => setCurrentEvent(json["current_event"]))
    }, [])

    const eventList = props.events.map(e => <option
        name={e[0]}
        value={e[0]}
        key={e[0]}
        selected={e[0] == currentEvent}>
            {e[0]}: {e[1]}
    </option>)
    
    return (
        <select 
            onChange={function (e) {
                setCurrentEvent(e.target.value)
                props.onChange(e)
            }}
            disabled={props.disable}
            value={props.value ?? currentEvent}>
                {eventList}
        </select>
    )

    
}