"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

import "../style.css"
import BackButton from "../components/backbutton.jsx"
import BlueTextButton from "../components/bluebuttton.jsx"
import GreenTextButton from "../components/greenbutton.jsx"

export default function NewPlayerPage () {
    return (
        <div >
            <div className="centre-align" style={{width: "80%"}}>
                <h1 className="page-title">Add new profile</h1>
                <BackButton/>
                <BlueTextButton text="I already have a profile" float="right" href="/existing"/>
                <p style={{textAlign: "center"}}>Please enter your information below.</p>
            </div>
            <NewPlayerForm />
        </div>
    )
}

function NewPlayerForm () {
    const router = useRouter()
    const [s, setState] = useState({"first_name": "", 
                                    "last_name": "",
                                    "phone": "",
                                    "player_id": "",
                                    "parent_name": "",
                                    "mha_id": "",
                                    "birthdate": "",
                                    "email": "",
                                    "mtg_id": "",
                                    "skip_parent": false})

    function submit_form () {
        let error_text = ""
        let skip_parent

        // Under 13 must provide parent's name. Under 18 are highly encouraged to provide parent's name
        if ((Date.now() - Date.parse(s["birthdate"])) < (1000 * 60 * 60 * 24 * 365.25 * 13) && s["parent_name"].length == 0) {
            //under 13
            error_text = "You must enter your parent or guardian's name if you are under 13."
        } else if ((Date.now() - Date.parse(s["birthdate"])) < (1000 * 60 * 60 * 24 * 365.25 * 18) 
                    && s["parent_name"].length == 0 
                    && ! s["skip_parent"]) {
            error_text = "Please enter your parent or guardian's name or press submit again to skip."
            skip_parent = true
        }

        // Telephone number must match regex (US phone number, 10 digits)
        if (! s["phone"].match(/\d\d\d\d\d\d\d\d\d\d/)) {
            error_text = "Please enter a US telephone number (10 digits). Enter all zeroes if you do not have one."
        }

        if (s["first_name"].length == 0
            || s["last_name"].length == 0
            || s["birthdate"].length == 0) {
            error_text = "Please enter values for all required fields."
        }

        if (error_text.length == 0) {
            // no problems
            let form_data = new FormData()
            let pid

            form_data.append("first_name", s["first_name"])
            form_data.append("last_name", s["last_name"])
            form_data.append("phone", s["phone"])
            form_data.append("player_id", s["player_id"])
            form_data.append("parent_name", s["parent_name"])
            form_data.append("mha_id", s["mha_id"])
            form_data.append("birthdate", s["birthdate"])
            form_data.append("email", s["email"])
            form_data.append("mtg_id", s["mtg_id"])

            fetch("http://localhost:8000/gng/new",
                {
                    method: "POST",
                    body: form_data
                }
            ).then ( (e) => e.json()
            ).then ( function (json) {
                pid = json["pid"]

                // Check in the player to the current event
                fetch(`http://localhost:8000/gng/checkin?pid=${pid}`, {
                    method: "GET"
                }
                ).then (
                    (e) => e.json()
                ).then (
                    router.push("/checkinsuccess")
                )
            })
        }

        setState({"first_name": s["first_name"], 
            "last_name": s["last_name"],
            "phone": s["phone"],
            "player_id": s["player_id"],
            "parent_name": s["parent_name"],
            "mha_id": s["mha_id"],
            "birthdate": s["birthdate"],
            "email": s["email"],
            "mtg_id": s["mtg_id"],
            "error_text": error_text,
            "skip_parent": skip_parent})

    }

    return (
        <div>
        <form name="infoform" id="info-form" method="POST" action="http://localhost:8000/gng/new">
            <p className="error-text" style={{textAlign: "center"}}>{s["error_text"]}</p>
            <table style={{marginLeft: "10%", marginRight: "20%"}}>
                <thead>
                    <tr style={{width: "50%"}}></tr>
                    <tr style={{width: "50%"}}></tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{width: "50%"}}> 
                            <label>★ Given name</label>
                            <input type="text" name="first_name" required onChange={(e) => setState({"first_name": e.target.value, 
                                                                                                     "last_name": s["last_name"],
                                                                                                     "phone": s["phone"],
                                                                                                     "player_id": s["player_id"],
                                                                                                     "parent_name": s["parent_name"],
                                                                                                     "mha_id": s["mha_id"],
                                                                                                     "birthdate": s["birthdate"],
                                                                                                     "email": s["email"],
                                                                                                     "mtg_id": s["mtg_id"]})}/>
                        </td>
                        <td style={{width: "50%"}}>
                            <label>★ Surname</label>
                            <input type="text" name="last_name" required onChange={(e) => setState({"first_name": s["first_name"], 
                                                                                                    "last_name": e.target.value,
                                                                                                    "phone": s["phone"],
                                                                                                    "player_id": s["player_id"],
                                                                                                    "parent_name": s["parent_name"],
                                                                                                    "mha_id": s["mha_id"],
                                                                                                    "birthdate": s["birthdate"],
                                                                                                    "email": s["email"],
                                                                                                    "mtg_id": s["mtg_id"]})}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>★ Phone number or parent's number</label>
                            <input type="tel" name="phone" required onChange={(e) => setState({"first_name": s["first_name"], 
                                                                                                "last_name": s["last_name"],
                                                                                                "phone": e.target.value,
                                                                                                "player_id": s["player_id"],
                                                                                                "parent_name": s["parent_name"],
                                                                                                "mha_id": s["mha_id"],
                                                                                                "birthdate": s["birthdate"],
                                                                                                "email": s["email"],
                                                                                                "mtg_id": s["mtg_id"]})}/>
                        </td>
                        <td>
                            <label>Play! Pokemon player ID</label>
                            <input type="number" name="player_id" onChange={(e) => setState({"first_name": s["first_name"], 
                                                                                            "last_name": s["last_name"],
                                                                                            "phone": s["phone"],
                                                                                            "player_id": e.target.value,
                                                                                            "parent_name": s["parent_name"],
                                                                                            "mha_id": s["mha_id"],
                                                                                            "birthdate": s["birthdate"],
                                                                                            "email": s["email"],
                                                                                            "mtg_id": s["mtg_id"]})}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Parent/guardian's name (if under 18)</label>
                            <input type="text" name="parent_name" onChange={(e) => setState({"first_name": s["first_name"], 
                                                                                            "last_name": s["last_name"],
                                                                                            "phone": s["phone"],
                                                                                            "player_id": s["player_id"],
                                                                                            "parent_name": e.target.value,
                                                                                            "mha_id": s["mha_id"],
                                                                                            "birthdate": s["birthdate"],
                                                                                            "email": s["email"],
                                                                                            "mtg_id": s["mtg_id"]})}/>
                        </td>
                        <td>
                            <label>MHA UGN email</label>
                            <input type="email" name="mha_id" onChange={(e) => setState({"first_name": s["first_name"], 
                                                                                        "last_name": s["last_name"],
                                                                                        "phone": s["phone"],
                                                                                        "player_id": s["player_id"],
                                                                                        "parent_name": s["parent_name"],
                                                                                        "mha_id": e.target.value,
                                                                                        "birthdate": s["birthdate"],
                                                                                        "email": s["email"],
                                                                                        "mtg_id": s["mtg_id"]})}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>★ Birthdate</label>
                            <input type="date" name="birthdate" required onChange={(e) => setState({"first_name": s["first_name"], 
                                                                                                    "last_name": s["last_name"],
                                                                                                    "phone": s["phone"],
                                                                                                    "player_id": s["player_id"],
                                                                                                    "parent_name": s["parent_name"],
                                                                                                    "mha_id": s["mha_id"],
                                                                                                    "birthdate": e.target.value,
                                                                                                    "email": s["email"],
                                                                                                    "mtg_id": s["mtg_id"]})}/>
                        </td>
                        <td>
                            <label>Lorcana/Melee email</label>
                            <input type="email" name="email" onChange={(e) => setState({"first_name": s["first_name"], 
                                                                                        "last_name": s["last_name"],
                                                                                        "phone": s["phone"],
                                                                                        "player_id": s["player_id"],
                                                                                        "parent_name": s["parent_name"],
                                                                                        "mha_id": s["mha_id"],
                                                                                        "birthdate": s["birthdate"],
                                                                                        "email": e.target.value,
                                                                                        "mtg_id": s["mtg_id"]})}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <label>MTG Arena email</label>
                            <input type="email" name="mtg_id" onChange={(e) => setState({"first_name": s["first_name"], 
                                                                                        "last_name": s["last_name"],
                                                                                        "phone": s["phone"],
                                                                                        "player_id": s["player_id"],
                                                                                        "parent_name": s["parent_name"],
                                                                                        "mha_id": s["mha_id"],
                                                                                        "birthdate": s["birthdate"],
                                                                                        "email": s["email"],
                                                                                        "mtg_id": e.target.value})}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>★ Required</p>
                            
                        </td>
                        <td style={{paddingLeft: "1%", paddingRight: "2%", paddingBottom: "2%"}}>
                            <p style={{textAlign: "left"}}>
                                Your information will be collected for the purpose of reporting attendance data as required by TCG publishers
                                and for internal record-keeping purposes. It will not be shared with or sold to anyone else.
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
        <div className="centre-align">
            <GreenTextButton text="Submit" onClick={submit_form} float="center"/>
        </div>
        </div>
    )
}
