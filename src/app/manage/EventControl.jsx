import "./manage.css"
import AddEventControl from "./AddEventControl"
import SubtractEventControl from "./SubtractEventControl"
import CurrentEventControl from "./CurrentEventControl"

// Renders the event control components
export default function EventControl (props) {
    return (
        <div className="right-align" id="event-control">
            <AddEventControl />
            <SubtractEventControl events={props.events}/>
            <CurrentEventControl events={props.events}/>
        </div>
    )
}