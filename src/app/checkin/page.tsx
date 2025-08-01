"use client"
import { useState } from "react"

import "../style.css"
import "./existing_player.css"
import BackButton from "../components/backbutton.jsx"
import BlueTextButton from "../components/bluebuttton.jsx"
import GreenTextButton from "../components/greenbutton.jsx"
import WhiteTextButton from "../components/whitebutton.jsx"
import { QueryResult } from "@/types/Query"

const config = require("@/config.json")

export default function NewPlayerPage () {

    const [searchResults, setSearchResults] = useState<Array<QueryResult>>([])

    return (
        <div >
            <div className="no-edge">
                <h1 className="page-title">Search for an existing profile</h1>
                <BackButton/>
                <GreenTextButton href="/checkin/new" text="My name isn't here" float="right"/>
            </div>
            
            <div className="no-edge">
                <SearchBar onChange={ (e) => 
                    setSearchResults(e) }/>
                <NameQueryResults results={searchResults}/>
            </div>
            
        </div>
    )
}

interface SearchBarProps {
    onChange: (results: Array<QueryResult>) => void
}

function SearchBar ({onChange}: SearchBarProps) {
    
    function search (query) {
        let params = new URLSearchParams()
        params.append("query", query)
        fetch(`/api/player/search/?${params}`,)
        .then( (x) => x.json())
        .then( (json: Array<QueryResult>) => onChange(json))
        .catch( (e) => console.log(e) )
    }
    

    return (
        <div className="centre-align">
            <form id="search-bar">
                <p>Begin typing your name in the box below, then press the button next to your name to check in.</p>
                <input type="text" id="query" name="query" onChange={ (e) => search(e.target.value) }/>
            </form>
        </div>
        
    )
}

interface NameQueryResultsProps {
    results: Array<QueryResult>
}

function NameQueryResults ({results}: NameQueryResultsProps) {

    if ("error" in results) {
        return (
            <p className="error-text">
                Too many results to display. Keep typing out your name or phone number.
            </p>
        )
    }

    if (results.length == 0) {
        return (
            <p className="error-text">
                No results.
            </p>
        )
            
    }

    let rows = results.map( (row) => <NameQueryRow rowData={row} key={row["pid"]}/>)

    return (
        <table className="centre-align">
            <thead >
                <tr>
                    <th className="given-name centre-align">
                        Given name
                    </th>
                    <th className="surname centre-align">
                        Surname
                    </th>
                    <th className="phone centre-align">
                        Phone number
                    </th>
                    <th className="select-button centre-align">

                    </th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
            
        </table>
    )
}

interface NameRowProps {
    rowData: QueryResult
}

function NameQueryRow ({rowData}: NameRowProps) {
    function checkIn (pid) {
        fetch(`/api/player/checkin?pid=${pid}`)
        .then( (r) => r.status)
        .then( function (status) {
            if (status == 200) {
                window.location.href = "/checkin/success"
            } else {
                window.location.href = "/checkin/duplicate"
            }
        })
    }

    return (
        <tr>
            <td className="given-name"> 
                {rowData.givenName}
            </td>
            <td className="surname">
                {rowData.surname}
            </td>
            <td className="phone">
                XXX-XXX-{rowData.phoneLastFour}
            </td>
            <td className="select-button">
                <WhiteTextButton onClick={() => checkIn(rowData.pid)} text="Select"/>
            </td>
        </tr>
    )
}