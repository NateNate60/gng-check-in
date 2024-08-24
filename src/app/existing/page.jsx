"use client"
import { useState } from "react"

import "../style.css"
import BackButton from "../components/backbutton.jsx"
import BlueTextButton from "../components/bluebuttton.jsx"
import GreenTextButton from "../components/greenbutton.jsx"

export default function NewPlayerPage () {
    return (
        <div >
            <h1 className="page-title">Search for an existing profile</h1>
            <SearchBar/>
            <NameQueryResults/>
        </div>
    )
}

function SearchBar () {
    

    return (
        <div className="centre-align">
            <form id="search-bar">
                <label>Begin typing your name below...</label><br/>
                <input type="text" id="query" name="query"/>
            </form>
        </div>
        
    )
}

function NameQueryResults () {

}