"use client"

import { useRouter } from "next/navigation"
import WhiteTextButton from "../../components/whitebutton"
import "../../style.css"

export default function CheckInSuccess () {

    const router = useRouter()

    setTimeout( function () {
        router.push("/")
    }, 5000)

    return (
        <div className="centre-align">
            <h1 className="page-title">
                You are all checked in!
            </h1>
            <p>
                Please find a seat or see staff for further directions.
            </p>
            <p>
                This screen will automatically advance in 5 seconds.
            </p>
            <WhiteTextButton href="/checkin" text="Check another player in"/>
        </div>
    )
}

async function AutoAdvanceScript () {

    setTimeout(function() {
        window.location.href = '..';
    }, 5000);
}