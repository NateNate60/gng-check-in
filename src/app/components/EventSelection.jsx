export default function EventSelection (props) {
    if (!"events" in props) {
        return
    }

    const check_in_events = props.events.map(e => <option defaultValue={e[0]}
        name={e[0]}
        key={e[0]}>
            {e[0]}: {e[1]}
    </option>)
    
    if (!props.disable) {
        return (
            <select onChange={props.onChange}>
                {check_in_events}
            </select>
        )
    } else {
        return (
            <select disabled>
                {check_in_events}
            </select>
        )
    }
    
}