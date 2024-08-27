"use client"
import { useState } from "react"

import "../style.css"
import BackButton from "../components/backbutton.jsx"
import BlueTextButton from "../components/bluebuttton.jsx"
import GreenTextButton from "../components/greenbutton.jsx"
import WhiteTextButton from "../components/whitebutton"

export default function NewPlayerPage () {

    const [search_results, set_search_results] = useState([])

    return (
        <div >
            <div style={{marginLeft: "10%", marginRight: "10%"}}>
                <h1 className="page-title">Search for an existing profile</h1>
                <BackButton/>
                <GreenTextButton href="/new" text="My name isn't here" float="right"/>
            </div>
            
            <div className="centre-align">
                <SearchBar onChange={ (e) => set_search_results(e) }/>
                <NameQueryResults results={search_results}/>
            </div>
            
        </div>
    )
}

function SearchBar (props) {
    
    function search (query) {
        fetch(`http://localhost:8000/gng/search?query=${query}`,)
        .then( (x) => x.json())
        .then( (json) => props.onChange(json))
        .catch( (e) => console.log(e) )
    }
    

    return (
        <div className="centre-align">
            <form id="search-bar">
                <p>Begin typing your name in the box below, then press the button next to your name to check in.</p>
                <input type="text" id="query" name="query" onChange={ (e) => search(e.target.value) } style={{width: "100%", fontSize:"200%"}}/>
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
        <table className="centre-align results-list" style={{width: "100%", justifyContent: "center"}}>
            <thead >
                <tr>
                    <th style={{width: "40vh"}}>
                        Given name
                    </th>
                    <th style={{width: "40vh"}}>
                        Surname
                    </th>
                    <th style={{width: "40vh"}}>
                        Phone number
                    </th>
                    <th style={{width: "15vh"}}>

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
    function check_in (pid) {
        fetch(`http://localhost:8000/gng/checkin?pid=${pid}`)
        .then( (r) => r.status)
        .then( function (status) {
            if (status == 200) {
                window.location.href = "/checkinsuccess"
            } else {
                window.location.href = "/checkinduplicate"
            }
        })
    }

    return (
        <tr>
            <td className="results-list"> 
                {props.entry["first_name"]}
            </td>
            <td className="results-list">
                {props.entry["last_name"]}
            </td>
            <td className="results-list">
                XXX-XXX-{props.entry["phone_last4"]}
            </td>
            <td>
                <WhiteTextButton onClick={() => check_in(props.entry["pid"])} text="Select"/>
            </td>
        </tr>
    )
}