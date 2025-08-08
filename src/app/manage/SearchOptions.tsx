import { useEffect, useState } from "react"

import BlueTextButton from "../components/bluebuttton"
import WhiteTextButton from "../components/whitebutton"
import MonthSelection from "../components/MonthSelection"
import DateSelection from "../components/DateSelection"
import EventSelection from "../components/EventSelection"
import { Events } from "@/types/Event"

const config = require("@/config.json")

interface SearchOptionProps {
    events: Events,
    applyFilter: (date: string, month: string, filter: number, event: number) => void,
    exportClick: () => void
}

export default function SearchOptions ({events, applyFilter, exportClick}: SearchOptionProps) {

    const [date, setDate] = useState<string>("")
    const [month, setMonth] = useState<string>("")
    const [filter, setFilter] = useState<number>(0)
    const [event, setEvent] = useState<number>(NaN)


    useEffect(() => applyFilter(date, month, filter, event), [])

    if (isNaN(event)) {
        let keys = Object.keys(events).map(Number);
        if (keys.length !== 0) {
            setEvent(Math.min(...keys))
        }
        
    }

    return (
        <form id="search-options">
        <table >
            <tbody>
                <tr>
                    <td>
                        <input type="radio" value="0" name="search_option" onChange={() => setFilter(0)}/>
                    </td>
                    <td>
                        Show all players in the database
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" value="1" name="search_option" onChange={() => setFilter(1)}/>
                    </td>
                    <td>
                        Show all attendance records
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" value="2" name="search_option" onChange={() => setFilter(2)}/>
                    </td>
                    <td>
                        Show all attendance records for the event
                    </td>
                    <td>
                        <EventSelection currentEvent={event} events={events} disable={filter != 2} onChange={(eid) => 
                            setEvent(eid)}/>
                    </td>
                    <td>
                        on any date
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" value="3" name="search_option" onChange={() => setFilter(3)}/>
                    </td>
                    <td>
                        Show all attendance records for the date
                    </td>
                    <td>
                        <DateSelection onChange={(e) => setDate(e)} disable={filter != 3} />
                    </td>
                    <td>
                        for all events
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" value="4" name="search_option" onChange={() => setFilter(4)}/>
                    </td>
                    <td>
                        Show attendance records for the event
                    </td>
                    <td>
                        <EventSelection events={events} onChange={(e) => setEvent(e)} disable={filter != 4} currentEvent={event}/>
                    </td>
                    <td>
                        in the month
                    </td>
                    <td>
                        <MonthSelection disable={filter != 4} onChange={(e) => setMonth(e.target.value)} month={month}/>
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <WhiteTextButton text="Search database" onClick={() => applyFilter(date, month, filter, event)}/>
                        &nbsp; &nbsp;
                        <BlueTextButton text="Export to CSV" onClick={() => exportClick()}/>
                    </td>
                </tr>
            </tbody>
        </table>
        </form>
    )
}