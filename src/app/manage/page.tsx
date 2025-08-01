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
    const [activeEvent, setActiveEvent] = useState<number>(NaN)

    const [date, setDate] = useState<string>("")
    const [filter, setFilter] = useState<number>(0)

    const [playerRecords, setPlayerRecords] = useState<Array<Player>>([])
    const [attendanceRecords, setAttendanceRecords] = useState<Array<AttendanceRecord>>([])
    function fetchEvents () {
        fetch(`/api/event`)
        .then( (result) => result.json())
        .then( (data) => {
            setEvents(data["events"])
            setActiveEvent(data["activeEvent"])
        })
    }

    useEffect( () => {
        fetchEvents()
    }, [])

    useEffect( () => {
        let params = new URLSearchParams()
        switch (filter) {
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
                params.append("eid", activeEvent.toString())
                fetch(`/api/attendance?${params}`)
                .then( (response) => response.json())
                .then( (data) => setAttendanceRecords(data))
                break;
            case 4:
                params.append("eid", activeEvent.toString())
            case 3:
                params.append("date", date)
                fetch(`/api/attendance?${params}`)
                .then( (response) => response.json())
                .then( (data) => setAttendanceRecords(data))
                break;
        }
    }, [filter])

    return (
        <div>
            <div>
                <h1 className="page-title">Management Page</h1>
                <BackButton />
            </div>
            <div>
                <SearchOptions applyFilter={(date, filter, event) => {
                    setDate(date)
                    setFilter(filter)
                    setActiveEvent(event)
                }} events={events}/>
                <EventControl events={events}/>
            </div>
            <SearchResults/>
            
        </div>
    )
}