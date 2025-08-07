"use client"

import { useEffect, useState } from "react";
import NumericEntryField from "../components/NumericEntryField"
import EventSelection from "../components/EventSelection";
import { Events } from "@/types/Event";
import Image from "next/image";
import WhiteTextButton from "../components/whitebutton";

interface SettingsControlProps {
    events: Events,
    triggerRefresh: () => void
}

export default function SettingsControl ({events, triggerRefresh}: SettingsControlProps) {

    const [count, setCount] = useState<number>(NaN)
    const [event, setEvent] = useState<number>(NaN)
    const [days, setDays] = useState<number>(NaN)

    const [error, setError] = useState<string>("")

    useEffect( () => {
        fetch("/api/eligibility")
        .then( (r) => r.json())
        .then( (data) => {
            setCount(data["count"])
            setEvent(data["event"])
            setDays(data["days"])
        }
        )
    }, [])

    return <table id="settings-control">
        <tbody>
            <tr>
                <th>
                    Pokéball Settings
                </th>
            </tr>
            <tr>
                <td>
                    The <Image width={20} height={20} src={"/pokeball.png"} alt="This player is eligible to buy a Pokémon product"/> appears
                    next to players who have attended at least <NumericEntryField step={1} min={0} value={count} onChange={(num) => {
                        setCount(num)
                        setError("")
                    }}/> events of 
                    type <EventSelection events={events} currentEvent={event} onChange={(e) => {
                        setEvent(e)
                        setError("")
                    }}/> within the
                    past <NumericEntryField step={1} min={0} value={days} onChange={(num) => {
                        setDays(num)
                        setError("")
                    }}/> days.
                </td>
            </tr>
            <tr>
                <td>
                    <WhiteTextButton text={"Save"} onClick={() => {
                        fetch("/api/eligibility", {
                            method: "PUT",
                            body: JSON.stringify({
                                count: count,
                                days: days,
                                eid: event
                            })
                        })
                        .then( (r) => {
                            if (r.ok) {
                                setError("Save successful.")
                                triggerRefresh()
                            } else {
                                setError("An error occurred.")
                            }
                        })
                    }}/>
                </td>
            </tr>
            <tr>
                <td>
                    {error}
                </td>
            </tr>
            <tr>
                <th>
                    Paste Token
                </th>
            </tr>
            <tr>
                <td>
                    <input type="password"/>
                    <WhiteTextButton text={"Submit"} onClick={() => {}}/>  
                </td>
                
            </tr>
        </tbody>
    </table>
}