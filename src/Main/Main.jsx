import Info from '../sections/Info/Info'
import ApplicationInfo from '../sections/ApplicationInfo/ApplicationInfo'
import PrizeOwners from '../sections/PrizeOwners/PrizeOwners'
import Nomination from '../sections/Nomination/Nomination'
import NetacadPrizes from '../sections/NetacadPrizes/NetacadPrizes'
import Welcome from '../sections/Welcome/Welcome'
import './Main.scss'


const Main = () => {
	return (
		<main>
			<Welcome />
			<Info />
			<ApplicationInfo />
			<NetacadPrizes />
			<PrizeOwners />
			<Nomination />
		</main>
	)
}

export default Main