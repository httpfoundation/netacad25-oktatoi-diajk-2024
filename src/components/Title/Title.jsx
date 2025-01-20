import './Title.scss'

const Title = (props) => {
	if (props.subtitle) return <h3 className="subtitle" >{props.children}</h3>
	return <h2 className="title" style={props.left ? {textAlign: "left",...props.style} : props.style}>{props.children}</h2>
}

export default Title