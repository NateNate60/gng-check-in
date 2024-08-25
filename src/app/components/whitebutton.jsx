export default function WhiteTextButton (props) {
    return (
        <span style={{float: props.float}}>
            <button className="white-button" onClick={props.onClick}>
                <a href={props.href}>
                {props.text} 
                </a>
            </button>
        </span>

    )
}
