import Section from "../../components/Section/Section"
import Text from "../../components/Text/Text"
import Title from "../../components/Title/Title"
import Bubble from "../../components/Bubble/Bubble"
import "./ApplicationInfo.scss"
import LightBulb from "../../icons/LightBulb"
import Networking from "../../icons/Networking"
import Star from "../../icons/Star"
import Tools from "../../icons/Tools"
import { StructuredText  } from "react-datocms"
import { useStaticElement } from '../../tools/datoCmsTools'

const ApplicationInfo = () => {
	const [info2Text1] = useStaticElement("info3") 
	const [info2Title] = useStaticElement("info2Title",false) 
	
	return <Section container placeholder id="palyazati-folyamat" info>
		<Title left={true}> <span>{info2Title}</span></Title>
		<Text><StructuredText data={info2Text1}/></Text>
	</Section>
}

export default ApplicationInfo