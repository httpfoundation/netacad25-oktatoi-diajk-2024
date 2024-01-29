import Section from "../../components/Section/Section"
import Text from "../../components/Text/Text"
import Title from "../../components/Title/Title"
import './NetacadPrizes.scss'
import telekomLogo from "../../assets/img/sponsors/Telekom.png"
import alizLogo from "../../assets/img/sponsors/aliz.png"
import microsoftLogo from "../../assets/img/sponsors/ms-logo_HU.png"
import ciscoLogo from "../../assets/img/sponsors/cisco2.png"
import pannonLogo from "../../assets/img/sponsors/pannon-mik2.png"
import eltetokLogo from "../../assets/img/sponsors/elte-tok2.png"
import netAcadLogo from "../../assets/img/sponsors/netacad2.png"
import { getSponsorCategories, useStaticElement, useSponsorCategories } from '../../tools/datoCmsTools'
import { StructuredText  } from "react-datocms"
import { useEffect, useState } from "react"
import { useQuery as useDatoQuery } from "graphql-hooks";

const Sponsor = (props) => {
	return (
		<div className="sponsor">
			<a href={props.link} target="_blank" rel="noopener noreferrer"  >
					<img src={props.image} alt={props.name} {...props}/>
			</a>
		</div>
	)
}

const NetacadPrizes = () => {
	const [sponsorText] = useStaticElement("sponsor") 
	const sponsorCategories = useSponsorCategories()

	return <Section container placeholder id="netacad-oktatasert-dijak">
		<Title><span className="highlight secondary">NETACAD Oktatásért díjak</span></Title>
		<Text subtitle>
			<Text description><StructuredText data={sponsorText}></StructuredText></Text>
		</Text>
		{sponsorCategories.map(category => <>
			<h3>{category?.name}</h3>
			<div className="sponsor-grid main-sponsors">
				{category?.sponsor?.map(sponsor => <Sponsor image={sponsor.logo.url} link={sponsor.url} />)}
			</div>
		</>)}

{/* 		<h3>Együttműködő partnerek</h3>
		<div className="sponsor-grid partner-sponsors">
			<Sponsor image={netAcadLogo} className="elte-tok" link="https://netacad.com/" />
			<Sponsor image={ciscoLogo} link="http://cisco.hu" />
			<Sponsor image={pannonLogo} link="https://mik.uni-pannon.hu/" />
			<Sponsor image={eltetokLogo} className="elte-tok" link="https://www.tok.elte.hu/" />
			<Sponsor image={netAcadLogo} className="elte-tok" link="https://netacad.com/" />
			<Sponsor image={ciscoLogo} link="http://cisco.hu" />
			<Sponsor image={pannonLogo} link="https://mik.uni-pannon.hu/" />
			<Sponsor image={eltetokLogo} className="elte-tok" link="https://www.tok.elte.hu/" />
		</div> */}
{/* 		<h3>Az InfoTanár Mentor Program fő támogatója</h3>
		<div className="sponsor-grid itmp-sponsors">
			<Sponsor image={alizLogo} className="" link="https://aliz.ai/" />
		</div>	 */}	
	</Section>
}

export default NetacadPrizes