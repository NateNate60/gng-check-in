import AddEventControl from "./AddEventControl"
import SubtractEventControl from "./SubtractEventControl"
import CurrentEventControl from "./CurrentEventControl"

// Renders the event control components
export default function EventControl (props) {
    return (
        <div style={{display: "inline-block", width: "30%", paddingRight: "5%"}} className="right-align">
            <AddEventControl />
            <SubtractEventControl events={props.events}/>
            <CurrentEventControl events={props.events}/>
        </div>
    )
}