"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import "../../small.css"
import WhiteTextButton from "@/app/components/whitebutton"
import RedTextButton from "@/app/components/redbutton"
import { Player } from "@/types/Player"

const config = require("@/config.json")

export default function EditPageSuspense () {
    return (
        <Suspense>
            <EditPage />
        </Suspense>
    )
}

function EditPage () {
    const [playerData, setPlayerData] = useState<Player>()
    const [isClient, setIsClient] = useState<boolean>(false)
    let pid = useSearchParams().get('pid')

    useEffect( function () {
        setIsClient(true)
        console.log("Fetching data")
        let urlParams = new URLSearchParams()
        urlParams.append("pid", pid)
        fetch(`/api/player/?` + urlParams
        ).then( (r) => r.json()
        ).then( (json: Array<Player>) => {
            if (json.length > 0) {
                setPlayerData(json[0])
            } else {
                console.log("Player not found")
            }
            
        })
    }, [pid])

    if (!isClient || playerData === undefined) {
        return // nothing, this avoid hydration errors
    }
    return (
        <div>
            <h1 className="page-title">Edit player</h1>
            <InformationForm player={playerData}/>
        </div>
    )
}

interface InformationFormProps {
    player: Player
}

function InformationForm ({player}) {

    const [playerData, setPlayerData] = useState<Player>(player)
    const [saveStatus, setSaveStatus] = useState<string>("")
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
                        <input value={playerData.givenName} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                givenName: e.target.value
                            })
                        }}/>
                    </td>
                    <td>
                        <label>Surname</label>
                    </td>
                    <td>
                        <input value={playerData.surname} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                surname: e.target.value
                            })
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Phone</label>
                    </td>
                    <td>
                        <input type="tel" value={playerData.phone} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                phone: e.target.value
                            })
                        }}/>
                    </td>
                    <td>
                        <label>Birthdate</label>
                    </td>
                    <td>
                        <input type="date" value={playerData.birthdate} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                birthdate: e.target.value
                            })
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Parent</label>
                    </td>
                    <td>
                        <input type="text" value={playerData.parentName} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                parentName: e.target.value
                            })
                        }}/>
                    </td>
                    <td>
                        <label>Pokemon ID</label>
                    </td>
                    <td>
                        <input type="number" value={playerData.pokemonID} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                pokemonID: e.target.value
                            })
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>MHA email</label>
                    </td>
                    <td>
                        <input type="email" value={playerData.mhaID} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                mhaID: e.target.value
                            })
                        }}/>
                    </td>
                    <td>
                        <label>MTGA email</label>
                    </td>
                    <td>
                        <input type="email" value={playerData.mtgID} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                mtgID: e.target.value
                            })
                        }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Lorcana email</label>
                    </td>
                    <td>
                        <input type="email" value={playerData.lorcanaID} onChange={ function (e) {
                            setSaveStatus("")
                            setPlayerData({
                                ...playerData,
                                lorcanaID: e.target.value
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

                            fetch(`/api/player`,
                                {
                                    body: JSON.stringify(playerData),
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    method: "PATCH"
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
                            urlParams.append("pid", playerData.pid.toString())
                            fetch(`/api/player?` + urlParams
                            ).then( (r) => r.json()
                            ).then( function (json: Array<Player>) {
                                setPlayerData(json[0])
                            })
                        }}/>
                    </td>
                </tr>
                    

            </tbody>
        </table>
    )
}
