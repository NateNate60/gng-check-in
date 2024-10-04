import { useState } from "react"

import BlueTextButton from "../components/bluebuttton"
import WhiteTextButton from "../components/whitebutton"
import MonthSelection from "../components/MonthSelection"
import DateSelection from "../components/DateSelection"
import EventSelection from "../components/EventSelection"

const config = require("@/config.json")

export default function SearchOptions (props) {
    const [state, setState] = useState({
        filter: 0,
        type: 0,
        date: "0"
    })


    function setFilter (event) {
        setState( previousState => ({
            ...previousState,
            filter: event.target.value
        }))
    }

    function setDate (event) {
        setState( previousState => ({
            ...previousState,
            date: event.target.value
        }))
    }

    function setEvent (event) {
        setState( previousState => ({
            ...previousState,
            type: event.target.value
        }))
    }

    function search () {
        fetch(`${config['domain']}/event/search?` + new URLSearchParams({
            filter: state["filter"],
            type: state["type"],
            date: state["date"]
        })).then ( (e) => (e.json())
        ).then ((json) => props.setSearchResults(json)
        )
    }

    return (
        <form id="search-options">
        <table >
            <tbody>
                <tr>
                    <td>
                        <input type="radio" value="0" name="search_option" onChange={(e) => setFilter(e)}/>
                    </td>
                    <td>
                        Show all players in the database
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" value="1" name="search_option" onChange={(e) => setFilter(e)}/>
                    </td>
                    <td>
                        Show all attendance records
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" value="2" name="search_option" onChange={(e) => setFilter(e)}/>
                    </td>
                    <td>
                        Show all attendance records for the event
                    </td>
                    <td>
                        <EventSelection events={props.events} onChange={(e) => setEvent(e)} disable={state["filter"] != 2} value={state["type"]}/>
                    </td>
                    <td>
                        on any date
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" value="3" name="search_option" onChange={(e) => setFilter(e)}/>
                    </td>
                    <td>
                        Show all attendance records for the date
                    </td>
                    <td>
                        <DateSelection onChange={(e) => setDate(e)} disable={state["filter"] != 3} />
                    </td>
                    <td>
                        for all events
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" value="4" name="search_option" onChange={(e) => setFilter(e)}/>
                    </td>
                    <td>
                        Show attendance records for the event
                    </td>
                    <td>
                        <EventSelection events={props.events} onChange={(e) => setEvent(e)} disable={state["filter"] != 4} value={state["type"]}/>
                    </td>
                    <td>
                        in the month
                    </td>
                    <td>
                        <MonthSelection disable={state["filter"] != 4} onChange={(e) => setDate(e)} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="radio" value="5" name="search_option" onChange={(e) => setFilter(e)}/>
                    </td>
                    <td>
                        Show attendance records for the player with pid
                    </td>
                    <td>
                        <input type="text" onChange={(e) => setDate(e)}/>
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <WhiteTextButton text="Search database" onClick={ search}/>
                        &nbsp; &nbsp;
                        <BlueTextButton text="Export to CSV"/>
                    </td>
                </tr>
            </tbody>
        </table>
        </form>
    )
}