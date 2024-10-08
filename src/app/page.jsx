import './style.css'
import "./home.css"
import Image from "next/image"

export default function Home () {
    return (
        <div>
            <h1 className="page-title">CHECK IN HERE</h1>
            <div id='home-row' >
                <NewPlayerButton />
                <Logo />
                <ExistingPlayerButton />
            </div>
        </div>
    )
}

function Logo () {
    return (
        <div id='logo'>
        <Image 
            src="/gnglogo.png"
            width={200}
            height={200}
            alt="Geeks & Games logo"
        />
        </div>
        
    )
}

function NewPlayerButton () {
    return (
        <button style={{width: 350}} className="green-button">
            {/* No amount of CSS fuckery will let this work, only inline style works :( */}
            <a href="/checkin/new">
                <Image
                    src="/new_user.png"
                    width="250"
                    height="250"
                    alt="New player icon"
                />
                <br/>
            </a>
            <h1>I&apos;m a new player</h1>
        </button>
    )
}

function ExistingPlayerButton () {
    return (
        <button style={{width: 350}} className="blue-button">
            {/* No amount of CSS fuckery will let this work, only inline style works :( */}
            <a href="/checkin">
                <Image
                    src="/existing_user.png"
                    width="300"
                    height="250"
                    alt="Existing player icon"
                />
                <br/>
                
            </a>
            <h1>I&apos;ve been here before</h1>
        </button>
    )
}