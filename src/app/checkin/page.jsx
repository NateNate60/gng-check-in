"use client"
import { useState } from "react"

import "../style.css"
import "./existing_player.css"
import BackButton from "../components/backbutton.jsx"
import BlueTextButton from "../components/bluebuttton.jsx"
import GreenTextButton from "../components/greenbutton.jsx"
import WhiteTextButton from "../components/whitebutton.jsx"

const config = require("@/config.json")

export default function NewPlayerPage () {

    const [searchResults, setSearchResults] = useState([])

    return (
        <div >
            <div className="no-edge">
                <h1 className="page-title">Search for an existing profile</h1>
                <BackButton/>
                <GreenTextButton href="/checkin/new" text="My name isn't here" float="right"/>
            </div>
            
            <div className="no-edge">
                <SearchBar onChange={ (e) => setSearchResults(e) }/>
                <NameQueryResults results={searchResults}/>
            </div>
            
        </div>
    )
}

function SearchBar (props) {
    
    function search (query) {
        fetch(`${config["domain"]}/search?/query=${query}`,)
        .then( (x) => x.json())
        .then( (json) => props.onChange(json))
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

function NameQueryResults (props) {
    let results = props.results

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

    let rows = results.map( (row) => <NameQueryRow entry={row} key={row["pid"]}/>)

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

function NameQueryRow (props) {
    function checkIn (pid) {
        fetch(`${config["domain"]}/checkin?/pid=${pid}`)
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
                {props.entry["first_name"]}
            </td>
            <td className="surname">
                {props.entry["last_name"]}
            </td>
            <td className="phone">
                XXX-XXX-{props.entry["phone_last4"]}
            </td>
            <td className="select-button">
                <WhiteTextButton onClick={() => checkIn(props.entry["pid"])} text="Select"/>
            </td>
        </tr>
    )
}