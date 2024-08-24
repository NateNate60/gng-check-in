export default function BlueTextButton (props) {
    return (
        <span style={{float: props.float}}>
            <button class="blue-button" onClick={props.onClick}>
                <a href={props.href}>
                {props.text} 
                </a>
            </button>
        </span>

    )
}