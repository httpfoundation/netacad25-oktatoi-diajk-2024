import ApplicationInfo from '../sections/ApplicationInfo/ApplicationInfo';
import Info from '../sections/Info/Info';
import NetacadPrizes from '../sections/NetacadPrizes/NetacadPrizes';
import Nomination from '../sections/Nomination/Nomination';
import PrizeOwners from '../sections/PrizeOwners/PrizeOwners';
import Welcome from '../sections/Welcome/Welcome';
import { useStaticElement } from '../tools/datoCmsTools';
import './Main.scss';

const Main = () => {
    const [nominationFormEnabled] = useStaticElement(
        'nominationFormEnabled',
        false
    );

    return (
        <main>
            <Welcome />
            {nominationFormEnabled && <Info />}
            {nominationFormEnabled && <ApplicationInfo />}
            <NetacadPrizes />
            <PrizeOwners />
            {nominationFormEnabled && <Nomination />}
        </main>
    );
};

export default Main;
