import Section from "../../components/Section/Section"
import Text from "../../components/Text/Text"
import Title from "../../components/Title/Title"
import Bubble from "../../components/Bubble/Bubble"
import "./Info.scss"
import LightBulb from "../../icons/LightBulb"
import Networking from "../../icons/Networking"
import Star from "../../icons/Star"
import Tools from "../../icons/Tools"
import { StructuredText  } from "react-datocms"
import { useStaticElement } from '../../tools/datoCmsTools'

const Info = () => {
	const [infoText1] = useStaticElement("info1") 
	const [infoText2] = useStaticElement("info2") 
	const [info1Title] = useStaticElement("info1Title", false) 
	const [info1Subtitle] = useStaticElement("info1Subtitle", false) 
	
	return <Section container placeholder id="informaciok" info>
		<Title left={true}> <span className="highlight">{info1Title}</span></Title>
		<Text><StructuredText data={infoText1}/></Text>

		<div className='row'>
				<div className='col-md-6 col-12'>
{/* 					<div className='bubbles'>
						<Bubble icon color='primary' size='extra-large' title={<LightBulb />} subtitle="Inspiráció" corners={['bottom-right']} />
						<Bubble icon color='light' size="large" title={<Networking />} subtitle="Közösségi kapcsolatok" corners={['bottom-left']} />
						<Bubble icon color='light' size="large" title={<Star />} subtitle="Versenyképes oktatás" corners={['top-right']} />
						<Bubble icon color='light' size="large" title={<Tools />} subtitle="Piacképes tudás" corners={['top-left']} />
					</div> */}
				</div>
				<div className='col-md-6 col-12'>
					<Title subtitle>{info1Subtitle}</Title>
					<Text>
						<StructuredText data={infoText2}/>
					</Text>
				</div>
			</div>
	</Section>
}

export default Info