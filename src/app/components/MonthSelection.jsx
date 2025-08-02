export default function MonthSelection (props) {
    if (!props.disable) {
        return (
            <input type="month" onChange={props.onChange} value={props.month}/>
        )
    }

    return (
        <input type="month" disabled/>
    )
}
