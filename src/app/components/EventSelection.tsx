"use client"
import { useEffect, useState } from "react"
import {Events} from "@/types/Event"

interface EventSelectionProps {
    events: Events,
    currentEvent: number,
    onChange: (eid: Number) => void
}

export default function EventSelection ({events, currentEvent, onChange}: EventSelectionProps) {
    


    const eventList = []
    for (let e in events) {
        eventList.push(<option
                value={events[e]} key={e}>
                    {e}: {events[e]}
            </option>)
    }
    
    
    return (
        <select value={currentEvent}
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