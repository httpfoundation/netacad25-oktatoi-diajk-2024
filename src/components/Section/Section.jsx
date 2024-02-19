import './Section.scss'
import negyedgomb from "../../assets/img/negyedgomb.png";
import felgomb from "../../assets/img/felgomb.png";

const Section = (props) => {
	return <section id={props.id} className={`section ${props.placeholder && 'section-placeholder'} ${props.className || ""}`} style={{position: props.static ? "static" : "relative"}}>
		{props.welcome && (
			<div class="background">
                <div class="background-strip zero-strip"></div>
                <div class="background-strip first-strip"></div>
                <div class="background-strip second-strip"></div>
                <div class="background-strip third-strip"></div>
				<div class="background-strip image-negyedgomb"><img src={negyedgomb} alt="" /></div>
				
            </div>
		)}
		{props.info && (
			<div class="background">
				<div class="background-strip image-felgomb"><img src={felgomb} alt="" /></div>
            </div>
		)}
		<div className={`${props.container && 'container'} ${props.relative && ' relative'}`}>
			{props.name && <h2>{props.name}</h2>}
			{props.children}
		</div>
	</section>
}

export default Section