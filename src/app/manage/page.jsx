"use client"

import "../small.css"

import { useEffect, useState } from "react"
import BackButton from "../components/backbutton"
import SearchResults from "./SearchResults"
import SearchOptions from "./SearchOptions"
import EventControl from "./EventControl"

const config = require("@/config.json")

export default function ManagementPage () {
    const [searchResults, setSearchResults] = useState("")
    const [events, setEvents] = useState(["Loading..."])

    useEffect( function () {
        fetch(`${config['domain']}/event`
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
                <SearchOptions setSearchResults={setSearchResults} events={events}/>
                <EventControl events={events}/>
            </div>
            <SearchResults results={searchResults}/>
            
        </div>
    )
}