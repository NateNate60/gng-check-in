"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

import "../../style.css"
import "./new.css"
import BackButton from "../../components/backbutton.jsx"
import BlueTextButton from "../../components/bluebuttton.jsx"
import GreenTextButton from "../../components/greenbutton.jsx"
import config from "@/config.json"
import { Player } from "@/types/Player"

export default function NewPlayerPage () {
    return (
        <div >
            <div className="no-edge">
                <h1 className="page-title">Add new profile</h1>
                <BackButton/>
                <BlueTextButton text="I already have a profile" float="right" href="/checkin"/>
                <p className="centre-align">Please enter your information below.</p>
            </div>
            <NewPlayerForm />
        </div>
    )
}

function NewPlayerForm () {
    const router = useRouter()
    const [givenName, setGivenName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [pokemonID, setPokemonID] = useState<string>("")
    const [mhaID, setMHAID] = useState<string>("")
    const [mtgID, setMTGID] = useState<string>("")
    const [lorcanaID, setLorcanaID] = useState<string>("")
    const [parentName, setParentName] = useState<string>("")
    const [birthdate, setBirthdate] = useState<Date>()

    const [skipParent, setSkipParent] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    function submitForm () {
        let errorText = ""

        // Under 13 must provide parent's name. Under 18 are highly encouraged to provide parent's name
        if (Date.now() - birthdate.getTime() < (1000 * 60 * 60 * 24 * 365.25 * 13) && parentName.length === 0) {
            //under 13
            errorText = "You must enter your parent or guardian's name if you are under 13."
        } else if (Date.now() - birthdate.getTime() < (1000 * 60 * 60 * 24 * 365.25 * 18) 
                    && parentName.length === 0 
                    && ! skipParent) {
            errorText = "Please enter your parent or guardian's name or press submit again to skip."
            setSkipParent(true)
        }

        // Telephone number must match regex (US phone number, 10 digits)
        if (! phone.match(/\d\d\d\d\d\d\d\d\d\d/)) {
            errorText = "Please enter a US telephone number (10 digits). Enter all zeroes if you do not have one."
        }

        if (givenName.length === 0
            || surname.length === 0
            || birthdate === undefined) {
            errorText = "Please enter values for all required fields."
        }

        if (errorText.length === 0) {
            // no problems
            fetch(`/api/player/new`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        givenName: givenName,
                        surname: surname,
                        phone: phone,
                        pokemonID: pokemonID,
                        mhaID: mhaID,
                        mtgID: mtgID,
                        lorcanaID: lorcanaID,
                        parentName: parentName,
                        birthdate: birthdate.toISOString().slice(0, 10)
                    })
                }
            ).then( async (r) => window.location.href = "/checkin/success"
            )
        } else {
            setError(errorText)
        }

    }

    return (
        <div>
        <form name="infoform" id="info-form" method="POST" action={`${config["domain"]}/new`}>
            <p className="error-text centre-align">{error}</p>
            <table className="no-edge">
                <thead>
                    <tr></tr>
                    <tr></tr>
                </thead>
                <tbody>
                    <tr>
                        <td> 
                            <label>★ Given name</label>
                            <input type="text" name="first_name" required value={givenName} onChange={(e) => setGivenName(e.target.value)}/>
                        </td>
                        <td>
                            <label>★ Surname</label>
                            <input type="text" name="last_name" required value={surname} onChange={(e) => setSurname(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>★ Phone number or parent&apos;s number</label>
                            <input type="tel" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </td>
                        <td>
                            <label>Play! Pokemon player ID</label>
                            <input type="number" name="player_id" value={pokemonID} onChange={(e) => setPokemonID(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Parent/guardian&apos;s name (if under 18)</label>
                            <input type="text" name="parent_name" value={parentName} onChange={(e) => setParentName(e.target.value)}/>
                        </td>
                        <td>
                            <label>MHA UGN email</label>
                            <input type="email" name="mha_id" value={mhaID} onChange={(e) => setMHAID(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>★ Birthdate</label>
                            <input type="date" name="birthdate" required  onChange={(e) => {
                                console.log(e.target.value)
                                setBirthdate(new Date(e.target.value))}}/>
                        </td>
                        <td>
                            <label>Lorcana/Melee email</label>
                            <input type="email" name="email" value={lorcanaID} onChange={(e) => setLorcanaID(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <label>MTG Arena email</label>
                            <input type="email" name="mtg_id" value={mtgID} onChange={(e) => setMTGID(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>★ Required</p>
                            
                        </td>
                        <td>
                            <p>
                                Your information will be collected for the purpose of reporting attendance data as required by TCG publishers
                                and for internal record-keeping purposes. It will not be shared with or sold to anyone else.
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
        <div className="centre-align">
            <GreenTextButton text="Submit" onClick={submitForm} float="center"/>
        </div>
        </div>
    )
}
