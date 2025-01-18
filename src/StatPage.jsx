import styled from "styled-components"
import  {useStatQuery} from "./tools/datoCmsTools"

const StatPage = () => {
	const [onsite, online, all] = useStatQuery("onsite")
	console.log("data", onsite)
	
	return (
		<Container>
			<h1>IOK 2025 jelentkezési statisztika</h1>
			<div>Összes regisztráció: {all?._allRegistrationsMeta.count}</div>
			<div>Regisztráció online részvételre: {online?._allRegistrationsMeta.count}</div>
			<div>Regisztráció helyszíni részvételre: {onsite?._allRegistrationsMeta.count}</div>
		</Container>
	)
}

const Container = styled.div`
    display: grid;
	grid-template-columns: auto;
    justify-content:center;
    align-items: center;
    color: white;
    background-color: #47CCD4;
	padding: 50px;
    margin-top: -90px
`

export default StatPage