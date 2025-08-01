"use client"
import { useEffect, useState } from "react"
import {Events} from "@/types/Event"

interface EventSelectionProps {
    events: Events,
    currentEvent: number,
    onChange: (eid: number) => void,
    disable?: boolean
}

export default function EventSelection ({events, currentEvent, onChange, disable}: EventSelectionProps) {

    const eventList = []
    for (let e in events) {
        eventList.push(<option
                value={e} key={e}>
                    {e}: {events[e]}
            </option>)
    }
    
    
    return (
        <select value={currentEvent} disabled={disable}
            onChange={ (e) => {
                let target = Number(e.target.value)
                if (target) {
                    onChange(target)
                }
            }}>
                {eventList}
        </select>
    )

    
}