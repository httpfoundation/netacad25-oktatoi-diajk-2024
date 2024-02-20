import Button from "../../components/Button/Button"
import Section from "../../components/Section/Section"
//import Text from "../../components/Text/Text"
import Title from "../../components/Title/Title"
import './Nomination.scss'

import { useState } from "react"
import { StructuredText } from "react-datocms"
import { SiteClient } from "datocms-client"
import { AppContext } from "../../App"
import { useContext } from "react"
import Modal from 'react-bootstrap/Modal'
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import { useStaticElement } from '../../tools/datoCmsTools'



const Nomination = (props) => {

	const context = useContext(AppContext)
	const [nominationSuccessText] = useStaticElement("nominationSuccess") 
	
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [workplace, setWorkplace] = useState('')
	const [phone, setPhone] = useState('')
	const [city, setCity] = useState('')
	const [nominationName, setNominationName] = useState('')
	const [nominationEmail, setNominationEmail] = useState('')
	const [nominationWorkplace, setNominationWorkplace] = useState('')
	const [nominationPhone, setNominationPhone] = useState('')
	const [nominationCity, setNominationCity] = useState('')
	const [nominationCiscoAcademyYear, setNominationCiscoAcademyYear] = useState(1998)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)
	const [nominationInstructor, setNominationInstructor] = useState(true)
	const [almasiCategory, setAlmasiCategory] = useState(false)
	const [szakkepzesCategory, setSzakkepzesCategory] = useState(true)
	const [felsooktatasCategory, setFelsooktatasCategory] = useState(false)
	const [nominationReason, setNominationReason] = useState('')

	const setCategory = (category, value) => {
		console.log({category}, {value})
		switch (category) {
			case "almasi":
				setAlmasiCategory(value)
				break
			case "szakkepzes":
				if (value) setFelsooktatasCategory(false)
				setSzakkepzesCategory(value)
				break
			case "felsooktatas":
				if (value) setSzakkepzesCategory(false)
				setFelsooktatasCategory(value)
				break
			default:
				break
		}
	}
	const nominationNameLabel = nominationInstructor ? "*A jelölt neve*" : "A jelölt intézmény neve*"
	const setNominationCiscoAcademyYearLabel = nominationInstructor ? "Mikortól akadémiai oktató a jelölted?*" : "Mikortól Cisco Akadémia a jelölt intézmény?*"
	const onSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setError(false)
		setSuccess(false)
		const client = new SiteClient(context.apiKey)
		try {
			await client.items.create({
				itemType: '94458',
				name,
				email,
				workplace,
				phone,
				city,
				nominationName,
				nominationEmail,
				nominationWorkplace,
				nominationPhone,
				nominationCity,
				nominationCiscoAcademyYear,
				nominationReason,
			})
			setSuccess(true)
			setError(false)
			setEmail('')
			setName('')
			setWorkplace('')
			setPhone('')
			setCity('')
			setNominationName('')
			setNominationEmail('')
			setNominationWorkplace('')
			setNominationPhone('')
			setNominationCity('')
			setNominationCiscoAcademyYear(1998)
			setNominationReason('')
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
		{/* <Title>Jelölés NetAcad Oktatásért<span className="text-uppercase"> DÍJRA</span></Title> */}
		<Title subtitle>
			A jelölési időszak lezárult.<br/>Köszönjük a jelöléseket!
		</Title>

			{/* <form className="reg-form" onSubmit={onSubmit}>
				<Title subtitle>Add meg az adataidat!</Title>
				
				<label className="form-label" htmlFor="name-field">Név*</label>
				<input id="name-field" className="form-control" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required/>

				<label className="form-label" htmlFor="email-field">E-mail cím*</label>
				<input id="email-field" className={`form-control ${error === "email" ? 'is-invalid' : ''}`} value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required/>

				<label className="form-label" htmlFor="phone-field">Telefonszám</label>
				<input id="phone-field" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel"/>

				<label className="form-label" htmlFor="workplace-field">Munkahely*</label>
				<input id="workplace-field" className="form-control" value={workplace} onChange={e => setWorkplace(e.target.value)} autoComplete="organization" required/>

				<label className="form-label" htmlFor="city-field">Település*</label>
				<input id="city-field" className="form-control" value={city} onChange={e => setCity(e.target.value)} autoComplete="address-level2" required/>

				<Title subtitle>Add meg a jelölésre vonatkozó adatokat!</Title>
				<div className="form-check mb-4 mt-4">
					<input className="form-check-input" type="radio" name="nomination-type" id="nomination-type-instructor" value="instructor" checked={nominationInstructor} onChange={e => setNominationInstructor(true)} required />
					<label className="form-check-label" htmlFor="nomination-type-instructor">
						Jelölés oktatói kategóriában
					</label>
				</div>
				<div className="form-check mb-4 mt-4">
					<input className="form-check-input" type="radio" name="nomination-type" id="nomination-type-organization" value="organization" checked={!nominationInstructor} onChange={e => setNominationInstructor(false)} required />
					<label className="form-check-label" htmlFor="nomination-type-organization">
						Jelölés intézményi kategóriában
					</label>
				</div>

				{nominationInstructor ? <>
					<div className="form-check mb-4 mt-4">
						<input className="form-check-input" type="checkbox" name="nomination-category" id="nomination-category-almasi" checked={almasiCategory} onChange={e => setCategory("almasi", e.target.checked)} />
						<label className="form-check-label" htmlFor="nomination-category-almasi">
							Almási Béla életműdíj
						</label>
					</div>
					<div className="form-check mb-4 mt-4">
						<input className="form-check-input" type="checkbox" name="nomination-category" id="nomination-category-szakkepzes" checked={szakkepzesCategory} onChange={e => setCategory("szakkepzes", e.target.checked)} />
						<label className="form-check-label" htmlFor="nomination-category-szakkepzes">
							NetAcad Oktatásért díj a szakképzésben végzett kiemelkedő munkáért
						</label>
					</div>
					<div className="form-check mb-4 mt-4">
						<input className="form-check-input" type="checkbox" name="nomination-category" id="nomination-category-felsooktatas" checked={felsooktatasCategory} onChange={e => setCategory("felsooktatas", e.target.checked)} />
						<label className="form-check-label" htmlFor="nomination-category-felsooktatas">
							NetAcad Oktatásért díj a felsőoktatásban végzett kiemelkedő munkáért
						</label>
					</div>

					<label className="form-label" htmlFor="nomination-name-field">{nominationNameLabel}</label>
					<input id="nomination-name-field" className="form-control" value={nominationName} onChange={e => setNominationName(e.target.value)} autoComplete="name" required/>
	
					<label className="form-label" htmlFor="nomination-email-field">A jelölt e-mail címe*</label>
					<input id="nomination-email-field" className={`form-control ${error === "email" ? 'is-invalid' : ''}`} value={nominationEmail} onChange={e => setNominationEmail(e.target.value)} autoComplete="email" required/>
	
					<label className="form-label" htmlFor="nomination-phone-field">A jelölt telefonszáma</label>
					<input id="nomination-phone-field" className="form-control" value={nominationPhone} onChange={e => setNominationPhone(e.target.value)} autoComplete="tel"/>

					<label className="form-label" htmlFor="nomination-workplace-field">A jelölt Cisco Akadémia intézményének neve</label>
					<input id="nomination-workplace-field" className="form-control" value={nominationWorkplace} onChange={e => setNominationWorkplace(e.target.value)} autoComplete="organization" required/>
				</>:				
					<>
						<label className="form-label" htmlFor="nomination-name-field">{nominationNameLabel}</label>
						<input id="nomination-name-field" className="form-control" value={nominationName} onChange={e => setNominationName(e.target.value)} autoComplete="name" required/>
					</>
				}

				<label className="form-label" htmlFor="nomination-city-field">Település*</label>
				<input id="nomination-city-field" className="form-control" value={nominationCity} onChange={e => setNominationCity(e.target.value)} autoComplete="address-level2" required/>

				{/*<label className="form-label mt-3" htmlFor="cisco-academy-teacher-since">{setNominationCiscoAcademyYearLabel}</label>
						<select id="cisco-academy-teacher-since" className="form-select" value={nominationCiscoAcademyYear} onChange={e => setNominationCiscoAcademyYear(e.target.value)} required>
							{ Array.from({length: 25}).map((_, index) => <option key={index} value={index+1998}>{index+1998}</option>) }
			</select> 
				<label className="form-label mt-3" htmlFor="nomination-justification-field">A jelölés rövid indoklása (maximum 300 karakter)*</label>
				<textarea id="nomination-justification-field" className="form-control" value={nominationReason} placeholder="Kérjük röviden indokold, hogy mi alapján tartod a jelöltet méltónak a díjra!"onChange={e => setNominationReason(e.target.value)} autoComplete="address-level2" required/>


				<div className="form-check mb-4 mt-4">
					<input className="form-check-input" type="checkbox" id="toc-field" required />
					<label className="form-check-label" htmlFor="toc-field">
						Elolvastam és elfogadom az <a href="https://www.datocms-assets.com/101437/1684764516-adatkezelesi_tajekoztato_netacad25.pdf" target="_blank" className="link" rel="noreferrer">Adatkezelési Tájékoztatóban</a> foglaltakat.*
					</label>
				</div>			
				<div className="my-4"/>

				<Alert variant="danger" show={error === "other"}>
					Ismeretlen hiba történt a jelölés során. Kérlek, próbáld újra később.
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
					<span style={{opacity: loading ? 0 : 1}}>Jelölés véglegesítése</span>
				</Button>
			</form> */}

		<Modal show={success} onHide={() => {setSuccess(false)}} centered>
			<Modal.Header>
				<Modal.Title>Sikeres jelölés!</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<StructuredText data={nominationSuccessText} />
			</Modal.Body>
			<Modal.Footer>
			<Button secondary onClick={() => setSuccess(false)}>
				Bezárás
			</Button>
			</Modal.Footer>
		</Modal>
	</Section>
}

export default Nomination