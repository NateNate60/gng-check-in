export default function WhiteTextButton (props) {
    return (
        <span style={{float: props.float}}>
            <a href={props.href}>
                <button className="white-button" type="button" onClick={props.onClick}>
                    {props.text} 
                </button>
            </a>
        </span>

    )
}
