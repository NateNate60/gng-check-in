export default function GreenTextButton (props) {
    return (
        <span style={{display: "flex", alignItems: props.float, justifyContent: props.float}}>
            <button className="green-button" onClick={props.onClick}>
                <a href={props.href}>
                {props.text} 
                </a>
            </button>
        </span>

    )
}