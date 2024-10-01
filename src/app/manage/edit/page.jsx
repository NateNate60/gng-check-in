"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import "../../small.css"
import WhiteTextButton from "@/app/components/whitebutton"
import RedTextButton from "@/app/components/redbutton"

const config = require("@/config.json")

export default function EditPage () {
    const [playerData, setPlayerData] = useState({})
    const [isClient, setIsClient] = useState(false)
    let pid = useSearchParams().get('pid')

    useEffect( function () {
        setIsClient(true)
        console.log("Fetching data")
        let urlParams = new URLSearchParams()
        urlParams.append("pid", pid)
        fetch(`http://${config['domain']}/player?` + urlParams
        ).then( (r) => r.json()
        ).then( function (json) {
            let returnObject = {}
            Object.keys(json).forEach( (key) => returnObject[key] = json[key] == "null" ? "" : json[key])
            setPlayerData(returnObject)
        })
    }, [])

    if (!isClient || Object.keys(playerData).length == 0) {
        return // nothing, this avoid hydration errors
    }
    return (
        <div>
            <h1 className="page-title">Edit player</h1>
            <InformationForm playerData={playerData}/>
        </div>
    )
}

function InformationForm (props) {

    const [playerData, setPlayerData] = useState(props.playerData)
    const [saveStatus, setSaveStatus] = useState("")
    return (
        <table className="edit-table">
            <tbody>
                <tr>
                    <td>
                        Player ID: {playerData["pid"]}
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Given name</label>
                    </td>
                    <td>
                        <input value={playerData["fname"]} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                "fname": e.target.value
                            })
                        }}/>
                    </td>
                    <td>
                        <label>Surname</label>
                    </td>
                    <td>
                        <input value={playerData["lname"]} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                "lname": e.target.value
                            })
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Phone</label>
                    </td>
                    <td>
                        <input type="tel" value={playerData["phone"]} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                "phone": e.target.value
                            })
                        }}/>
                    </td>
                    <td>
                        <label>Birthdate</label>
                    </td>
                    <td>
                        <input type="date" value={playerData["bday"]} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                "bday": e.target.value
                            })
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Parent</label>
                    </td>
                    <td>
                        <input type="text" value={playerData["parent_name"]} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                "parent_name": e.target.value
                            })
                        }}/>
                    </td>
                    <td>
                        <label>Pokemon ID</label>
                    </td>
                    <td>
                        <input type="number" value={playerData["pokemon_id"]} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                "pokemon_id": e.target.value
                            })
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>MHA email</label>
                    </td>
                    <td>
                        <input type="email" value={playerData["mha_id"]} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                "mha_id": e.target.value
                            })
                        }}/>
                    </td>
                    <td>
                        <label>MTGA email</label>
                    </td>
                    <td>
                        <input type="email" value={playerData["mtg_id"]} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                "mtg_id": e.target.value
                            })
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Lorcana email</label>
                    </td>
                    <td>
                        <input type="email" value={playerData["email"]} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                "email": e.target.value
                            })
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        {saveStatus}
                    </td>
                </tr>
                <tr>
                    <td>

                    </td>
                    <td>
                        <WhiteTextButton text="Save changes" onClick={function () {
                            let formData = new FormData()
                            Object.keys(playerData).forEach(key => {
                                formData.append(key, playerData[key])
                            });
                            fetch(`http://${config['domain']}/player/edit`,
                                {
                                    body: formData,
                                    method: "POST"
                                }
                            ).then( (r) => r.ok
                            ).then( (status) =>  setSaveStatus(status ? "Save successful" : "Save failed. One or more required fields is missing."))
                        }}/>
                    </td>
                    <td>
                        (Close this window to quit without saving)
                    </td>
                    <td>
                        <RedTextButton text="Reset form" onClick={function () {
                            setSaveStatus("")
                            let urlParams = new URLSearchParams()
                            urlParams.append("pid", playerData["pid"])
                            fetch(`http://${config['domain']}/player?` + urlParams
                            ).then( (r) => r.json()
                            ).then( function (json) {
                                let returnObject = {}
                                Object.keys(json).forEach( (key) => returnObject[key] = json[key] == "null" ? "" : json[key])
                                setPlayerData(returnObject)
                            })
                        }}/>
                    </td>
                </tr>
                    

            </tbody>
        </table>
    )
}