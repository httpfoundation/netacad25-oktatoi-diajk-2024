import './Header.scss'
import BrandImg from '../assets/img/Cisco-Networking-Academy-Logo-WH.png' 
import BrandImgSmall from '../assets/img/http-iok-logo-small.png' 
import Button from '../components/Button/Button'
import Ticket from '../icons/Ticket'
import useScrollPosition from '@react-hook/window-scroll'
import { useState } from 'react'
import Fade from 'react-reveal/Fade'


const HamburgerMenu = (props) => {


	const items = [
		{ name: 'Információk', href: '/#informaciok' },
		{ name: 'Pályázati folyamat', href: '/#palyazati-folyamat' },
		{ name: 'NetAcad Oktatásért díjak', href: '/#netacad-oktatasert-dijak' },
		{ name: '2023-as díjazottak', href: '/#dijazottak' },
		{ name: 'Kapcsolat', href: '/#kapcsolat' },
	]

	return (
		<>
		<div className={`backdrop ${props.open ? 'open' : ''}`} onClick={props.onClose}></div>
		<div className={`hamburger-menu ${props.open ? 'open' : ''}`}>
			<div className="hamburger-toggle close" onClick={props.onClose}>
				<div className="bar"></div>
				<div className="bar"></div>
				<div className="bar"></div>
			</div>
			<div className='hamburger-menu-items'>
				{ items.map((item, key) => <a key={key} href={item.href} onClick={props.onClose}>{item.name}</a>)}
			</div>
			<Button href="#jeloles" onClick={props.onClose}><Ticket />Jelölés</Button>
		</div>
		</>
	)
}

const Header = () => {

	const scrollY = useScrollPosition(30 /*fps*/)
	const limit = 100


	const [menuOpen, setMenuOpen] = useState(false)

	return <header className={`${scrollY < limit ? 'transparent' : ''}`}>
		<div className="container">
			<Fade top delay={900}>
				{/* <img src={BrandImgSmall} alt="HTTP Alapítvány" className="brand-image brand-image-small" /> */}
				<img src={BrandImg} alt="HTTP Alapítvány" className="brand-image" />
				<h1></h1> 
				<Button href="#jeloles"><Ticket />Jelölés</Button>
				<div className="hamburger-toggle" onClick={() => setMenuOpen(true)}>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
				</div>
			</Fade>
		</div>
		<HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
	</header>
}

export default Header