"use client"

import { useRouter } from "next/navigation"
import WhiteTextButton from "../components/whitebutton"
import "../style.css"

export default function CheckInSuccess () {

    const router = useRouter()

    setTimeout( function () {
        router.push("/")
    }, 5000)

    return (
        <div className="centre-align">
            <h1 className="page-title">
                You are already checked in
            </h1>
            <p>
                You've already checked in previously to this event so you don't need to check in again.
            </p>
            <p>
                This screen will automatically advance in 5 seconds.
            </p>
            <WhiteTextButton href="/existing" text="Check another player in"/>
        </div>
    )
}

async function AutoAdvanceScript () {

    setTimeout(function() {
        window.location.href = '..';
    }, 5000);
}