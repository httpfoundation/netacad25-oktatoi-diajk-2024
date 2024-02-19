import Button from "../../components/Button/Button"
import Section from "../../components/Section/Section"
//import Text from "../../components/Text/Text"
import Title from "../../components/Title/Title"
import './Application.scss'

import { useState } from "react"
import { StructuredText } from "react-datocms"
import { SiteClient } from "datocms-client"
import { AppContext } from "../../App"
import { useContext } from "react"
import Modal from 'react-bootstrap/Modal'
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import { useStaticElement } from '../../tools/datoCmsTools'



const Application = (props) => {

	const context = useContext(AppContext)
	const [applicationSuccessText] = useStaticElement("applicationSuccess") 
	
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [successModalOpen, setSuccessModalOpen] = useState(false)
	const [error, setError] = useState(false)

	const onSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setError(false)
		setSuccessModalOpen(false)
		const client = new SiteClient(context.apiKey)
		try {
			await client.items.create({
				itemType: 'UfSMQX0jQUmFTSgShbK7dQ',
				name,
				email,
			})
			setSuccessModalOpen(true)
			setSuccess(true)
			setError(false)
			setEmail('')
		} catch (error) {
			console.log(error)
			if (error.statusCode === 422) {
				if (error.message.includes('VALIDATION_UNIQUE')) {
					if (error.message.includes("email")) setError("email")
					else if (error.message.includes("vip_code")) setError("vip")
					else setError("other")
				} else if (error.message.includes("INVALID_FIELD")) {
					if (error.message.includes("vip_code")) setError("vip")
					else setError("other")
				} else {
					setError("other")
				}
			} else {
				setError("other")
			}
		} finally {
			setLoading(false)
		}

	}

	return <Section id="jeloles" container placeholder>
		<Title>Pályázat benyújtása NetAcad Oktatásért díjra</Title>

			{success ? 
				<Title subtitle>
					Köszönjük a pályázatot!
				</Title>
			: <form className="reg-form" onSubmit={onSubmit}>
				<Title subtitle></Title>
				
				<label className="form-label" htmlFor="name-field">Név*</label>
				<input id="name-field" className="form-control" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required/>

				<label className="form-label" htmlFor="email-field">E-mail cím*</label>
				<input id="email-field" className={`form-control ${error === "email" ? 'is-invalid' : ''}`} value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required/>

				
				<div className="form-check mb-4 mt-4">
					<input className="form-check-input" type="checkbox" id="toc-field" required />
					<label className="form-check-label" htmlFor="toc-field">
						Elolvastam és elfogadom az <a href="https://www.datocms-assets.com/101437/1684764516-adatkezelesi_tajekoztato_netacad25.pdf" target="_blank" className="link" rel="noreferrer">Adatkezelési Tájékoztatóban</a> foglaltakat.*
					</label>
				</div>			
				<div className="my-4"/>

				<Alert variant="danger" show={error === "other"}>
					Ismeretlen hiba történt a pályázat benyújtása során. Kérlek, próbáld újra később.
				</Alert>
				

				<Button submit>
					{ loading &&
					<div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)' }}>
						<Spinner
							as="span"
							animation="border"
							role="status"
							aria-hidden="true"
						/>
					</div>
					}
					<span style={{opacity: loading ? 0 : 1}}>Pályázat benyújtása</span>
				</Button>
			</form>}

		<Modal show={successModalOpen} onHide={() => {setSuccessModalOpen(false)}} centered>
			<Modal.Header>
				<Modal.Title>Sikeres pályázat!</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<StructuredText data={applicationSuccessText} />
			</Modal.Body>
			<Modal.Footer>
			<Button secondary onClick={() => setSuccessModalOpen(false)}>
				Bezárás
			</Button>
			</Modal.Footer>
		</Modal>
	</Section>
}

export default Application