import './style.css'
import Image from "next/image"

export default function Home () {
    return (
        <div style={{marginLeft: "auto", marginRight: "auto"}}>
            <h1 className="page-title">CHECK IN HERE</h1>
            <div style={{display: "flex", justifyContent: "center"}} >
                <NewPlayerButton />
                <Logo />
                <ExistingPlayerButton />
            </div>
        </div>
    )
}

function Logo () {
    return (
        <div style={{padding: 50}}>
        <Image 
            src="/gnglogo.png"
            width={200}
            height={200}
        />
        </div>
        
    )
}

function NewPlayerButton () {
    return (
        <button style={{float: "inline-end"}} className="green-button">
            <a href="/new">
                <Image
                    src="/new_user.png"
                    width="300"
                    height="250"
                />
                <br/>
                <h1 style={{color: "black"}}>I'm a new player</h1>
            </a>
        </button>
    )
}

function ExistingPlayerButton () {
    return (
        <button style={{float: "inline-start"}} class="blue-button">
            <a href="/existing">
                <Image
                    src="/existing_user.png"
                    width="300"
                    height="250"
                />
                <br/>
                <h1 style={{color: "black"}}>I've been here before</h1>
            </a>
        </button>
    )
}