"use client"

import "../small.css"

import { useEffect, useState } from "react"
import BackButton from "../components/backbutton"
import SearchResults from "./SearchResults"
import SearchOptions from "./SearchOptions"
import EventControl from "./EventControl"

export default function ManagementPage () {
    const [search_results, set_search_results] = useState("")
    const [events, setEvents] = useState(["Loading..."])

    useEffect( function () {
        fetch("http://localhost:8000/gng/event"
        ).then( (r) => r.json()
        ).then( (json) => setEvents(json))
    }, [])


    return (
        <div>
            <div>
                <h1 className="page-title">Management Page</h1>
                <BackButton />
            </div>
            <div>
                <SearchOptions set_search_results={set_search_results} events={events}/>
                <EventControl events={events}/>
            </div>
            <SearchResults results={search_results}/>
            
        </div>
    )
}