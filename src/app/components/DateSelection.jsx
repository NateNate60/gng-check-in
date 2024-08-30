export default function DateSelection (props) {
    if (!props.disable) {
        return (
            <input type="date" onChange={props.onChange}/>
        )
    }

    return (
        <input type="date" disabled/>
    )
}