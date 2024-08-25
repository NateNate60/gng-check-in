export default function GreenTextButton (props) {
    return (
        <span style={{display: "flex", alignItems: props.float, justifyContent: props.float}}>
            <a href={props.href}>
                <button class="green-button" onClick={props.onClick}>
                    {props.text} 
                </button>
            </a>
        </span>

    )
}