"use client"

import "../small.css"

import { useEffect, useState } from "react"
import BackButton from "../components/backbutton"
import SearchResults from "./SearchResults"
import SearchOptions from "./SearchOptions"
import EventControl from "./EventControl"
import { Events } from "@/types/Event"
import { Player } from "@/types/Player"
import { AttendanceRecord } from "@/types/AttendanceRecord"

const config = require("@/config.json")

export default function ManagementPage () {
    const [events, setEvents] = useState<Events>({})

    const [filter, setFilter] = useState<number>(NaN)

    const [playerRecords, setPlayerRecords] = useState<Array<Player>>([])
    const [attendanceRecords, setAttendanceRecords] = useState<Array<AttendanceRecord>>([])
    function fetchEvents () {
        fetch(`/api/event`)
        .then( (result) => result.json())
        .then( (data) => {
            setEvents(data["events"])
        })
    }

    function refresh (date: string, month: string, appliedFilter: number, event: number) {
        let params = new URLSearchParams()
        switch (appliedFilter) {
            case 0:
                fetch(`/api/player`)
                .then( (response) => response.json())
                .then( (data) => setPlayerRecords(data))
                break
            case 1:
                fetch(`/api/attendance`)
                .then( (response) => response.json())
                .then( (data) => setAttendanceRecords(data))
                break;
            case 2:
                params.append("eid", event.toString())
                fetch(`/api/attendance?${params}`)
                .then( (response) => response.json())
                .then( (data) => setAttendanceRecords(data))
                break;
            case 3:
                params.append("date", date)
                fetch(`/api/attendance?${params}`)
                .then( (response) => response.json())
                .then( (data) => setAttendanceRecords(data))
                break;
            case 4:
                params.append("date", month)
                params.append("eid", event.toString())
                fetch(`/api/attendance?${params}`)
                .then( (response) => response.json())
                .then( (data) => setAttendanceRecords(data))
                break;
        }
        setFilter(appliedFilter)
    }

    useEffect( fetchEvents, [])

    return (
        <div>
            <div>
                <h1 className="page-title">Management Page</h1>
                <BackButton />
            </div>
            <div>
                <SearchOptions applyFilter={refresh} events={events}/>
                <EventControl events={events}/>
            </div>
            <SearchResults events={events} playerRecords={playerRecords} attendanceRecords={attendanceRecords} use={filter === 0 ? "players" : "attendance"}/>
            
        </div>
    )
}