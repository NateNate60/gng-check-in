import EventSelection from "../components/EventSelection"
import WhiteTextButton from "../components/whitebutton"

// Component that renders the dialogue to change the current active event
export default function CurrentEventControl () {

    function change_event () {

    }

    return (
        <div>
            <h3>
                Change current event
            </h3>
            <p>
                The current event determines which event players are checked in to.
            </p>
            <span style={{float: "inline-start"}}>
                <EventSelection events={['1']} onChange={ (e) => setState(e.target.value) }/>
            </span>
            <span style={{float: "inline-end"}}>
                <WhiteTextButton text="Change" onClick={change_event}/>
            </span>
        </div>
    )
}