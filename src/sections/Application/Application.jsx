import Button from '../../components/Button/Button';
import Section from '../../components/Section/Section';
//import Text from "../../components/Text/Text"
import Title from '../../components/Title/Title';
import './Application.scss';

import { SiteClient } from 'datocms-client';
import { useContext, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { StructuredText } from 'react-datocms';
import { AppContext } from '../../App';
import { useStaticElement } from '../../tools/datoCmsTools';

const Application = (props) => {
    const context = useContext(AppContext);
    const [applicationSuccessText] = useStaticElement('applicationSuccess');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [ciscoAcademyName, setCiscoAcademyName] = useState('');
    const [ciscoAcademyYear, setCiscoAcademyYear] = useState('1998');
    const [material, setMaterial] = useState('');
    const [almasiCategory, setAlmasiCategory] = useState(false);
    const [szakkepzesCategory, setSzakkepzesCategory] = useState(false);
    const [felsooktatasCategory, setFelsooktatasCategory] = useState(false);
    const [reason, setReason] = useState('');

    const setCategory = (category, value) => {
        console.log({ category }, { value });
        switch (category) {
            case 'almasi':
                setAlmasiCategory(value);
                break;
            case 'szakkepzes':
                if (value) setFelsooktatasCategory(false);
                setSzakkepzesCategory(value);
                break;
            case 'felsooktatas':
                if (value) setSzakkepzesCategory(false);
                setFelsooktatasCategory(value);
                break;
            default:
                break;
        }
    };

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [error, setError] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        setSuccessModalOpen(false);
        const client = new SiteClient(context.apiKey);
        try {
            await client.items.create({
                itemType: 'UfSMQX0jQUmFTSgShbK7dQ',
                name,
                email,
                phone,
                ciscoAcademyName,
                ciscoAcademyYear,
                material,
                reason,
                almasiCategory,
                szakkepzesCategory,
                felsooktatasCategory
            });
            setSuccessModalOpen(true);
            setSuccess(true);
            setError(false);
        } catch (error) {
            console.log(error);
            if (error.statusCode === 422) {
                if (error.message.includes('VALIDATION_UNIQUE')) {
                    if (error.message.includes('email')) setError('email');
                    else if (error.message.includes('vip_code'))
                        setError('vip');
                    else setError('other');
                } else if (error.message.includes('INVALID_FIELD')) {
                    if (error.message.includes('vip_code')) setError('vip');
                    else setError('other');
                } else {
                    setError('other');
                }
            } else {
                setError('other');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Section id="jeloles" container placeholder>
            <Title>Pályázat benyújtása NetAcad Oktatásért díjra</Title>

            {success ? (
                <Title subtitle>Köszönjük a pályázatot!</Title>
            ) : (
                <form className="reg-form" onSubmit={onSubmit}>
                    <Title subtitle></Title>

                    <label className="form-label" htmlFor="name-field">
                        NetAcad oktatói díj kategória, amiben a rövidített
                        jelölti listába bekerültél:
                    </label>
                    <div className="form-check mb-4 mt-1">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="nomination-category"
                            id="nomination-category-almasi"
                            checked={almasiCategory}
                            onChange={(e) =>
                                setCategory('almasi', e.target.checked)
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="nomination-category-almasi"
                        >
                            Almási Béla életműdíj
                        </label>
                    </div>
                    <div className="form-check mb-4 mt-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="nomination-category"
                            id="nomination-category-szakkepzes"
                            checked={szakkepzesCategory}
                            onChange={(e) =>
                                setCategory('szakkepzes', e.target.checked)
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="nomination-category-szakkepzes"
                        >
                            NetAcad Oktatásért díj a szakképzésben végzett
                            kiemelkedő munkáért
                        </label>
                    </div>
                    <div className="form-check mb-4 mt-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="nomination-category"
                            id="nomination-category-felsooktatas"
                            checked={felsooktatasCategory}
                            onChange={(e) =>
                                setCategory('felsooktatas', e.target.checked)
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="nomination-category-felsooktatas"
                        >
                            NetAcad Oktatásért díj a felsőoktatásban végzett
                            kiemelkedő munkáért
                        </label>
                    </div>

                    <label className="form-label mt-4" htmlFor="name-field">
                        Név*
                    </label>
                    <input
                        id="name-field"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        required
                    />

                    <label className="form-label" htmlFor="email-field">
                        E-mail cím*
                    </label>
                    <input
                        id="email-field"
                        className={`form-control ${
                            error === 'email' ? 'is-invalid' : ''
                        }`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />

                    <label className="form-label" htmlFor="phone-field">
                        Telefonszám
                    </label>
                    <input
                        id="phone-field"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                    />

                    <label
                        className="form-label"
                        htmlFor="nomination-workplace-field"
                    >
                        Cisco Akadémia intézményének neve*
                    </label>
                    <input
                        id="nomination-workplace-field"
                        className="form-control"
                        value={ciscoAcademyName}
                        onChange={(e) => setCiscoAcademyName(e.target.value)}
                        autoComplete="organization"
                        required
                    />

                    <label
                        className="form-label mt-1"
                        htmlFor="cisco-academy-teacher-since"
                    >
                        Mióta vagy Cisco akadémiai oktató?*
                    </label>
                    <select
                        id="cisco-academy-teacher-since"
                        className="form-select"
                        value={ciscoAcademyYear}
                        onChange={(e) => setCiscoAcademyYear(e.target.value)}
                        required
                    >
                        {Array.from({ length: 25 }).map((_, index) => (
                            <option key={index} value={index + 1998}>
                                {index + 1998}
                            </option>
                        ))}
                    </select>

                    <label
                        className="form-label mt-3"
                        htmlFor="nomination-material-field"
                    >
                        Milyen akadémiai tananyagokat oktattál eddig?*
                    </label>
                    <textarea
                        id="nomination-material-field"
                        className="form-control"
                        value={material}
                        placeholder=""
                        onChange={(e) => setMaterial(e.target.value)}
                        required
                    />

                    <label
                        className="form-label mt-1"
                        htmlFor="nomination-reason-field"
                    >
                        Kérjük maximum 1000 karakternyi terjedelemben foglald
                        össze a Cisco Hálózati Akadémia keretében végzett
                        munkádat, projektjeidet!*
                    </label>
                    <textarea
                        id="nomination-reason-field"
                        className="form-control"
                        value={reason}
                        placeholder=""
                        onChange={(e) => setReason(e.target.value)}
                        required
                        rows={6}
                    />

                    <div className="form-check mb-4 mt-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="toc-field"
                            required
                        />
                        <label className="form-check-label" htmlFor="toc-field">
                            Elolvastam és elfogadom az{' '}
                            <a
                                href="https://www.datocms-assets.com/151170/1740055971-adatkezelesi_tajekoztato_netacad_oktatasert_dijak.pdf"
                                target="_blank"
                                className="link"
                                rel="noreferrer"
                            >
                                Adatkezelési Tájékoztatóban
                            </a>{' '}
                            foglaltakat.*
                        </label>
                    </div>
                    <div className="my-4" />

                    <Alert variant="danger" show={error === 'other'}>
                        Ismeretlen hiba történt a pályázat benyújtása során.
                        Kérlek, próbáld újra később.
                    </Alert>

                    <Button submit>
                        {loading && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    left: '50%',
                                    transform: 'translateX(-50%)'
                                }}
                            >
                                <Spinner
                                    as="span"
                                    animation="border"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </div>
                        )}
                        <span style={{ opacity: loading ? 0 : 1 }}>
                            Pályázat benyújtása
                        </span>
                    </Button>
                </form>
            )}

            <Modal
                show={successModalOpen}
                onHide={() => {
                    setSuccessModalOpen(false);
                }}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Sikeres pályázat!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StructuredText data={applicationSuccessText} />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        secondary
                        onClick={() => setSuccessModalOpen(false)}
                    >
                        Bezárás
                    </Button>
                </Modal.Footer>
            </Modal>
        </Section>
    );
};

export default Application;
