import { Fragment, useState } from 'react';
import Bubble from '../../components/Bubble/Bubble';
import Section from '../../components/Section/Section';
import Title from '../../components/Title/Title';
import { useAllElements } from '../../tools/datoCmsTools';
import { getHungarianYearPostfix } from '../../tools/utils';
import './PrizeOwners.scss';

const PrizeOwner = (props) => {
    return (
        <div className="presenter-card" style={props.style ? props.style : {}}>
            <div className="presenter-wrapper">
                <div
                    className="presenter-img"
                    style={{ backgroundImage: "url('" + props.imageUrl + "')" }}
                >
                    <Bubble
                        smallText
                        darkText
                        title={props.name}
                        subtitle={`${props.title}, ${props.company}`}
                        size="large"
                        shadow
                        color={props.highlight ? 'primary' : 'light'}
                        corners={[props.right ? 'bottom-right' : 'top-left']}
                    ></Bubble>
                </div>
                <div className="presenter-name-mobile">
                    <div className="name">{props.name}</div>
                    <div className="title">
                        {props.title}, {props.company}
                    </div>
                </div>
            </div>
        </div>
    );
};

const HighlightedPrizeOwners = (props) => {
    const { presenters } = props;
    return (
        <div className="presenters-grid">
            {presenters?.map((presenter, index) => (
                <PrizeOwner
                    key={presenter.slug}
                    right={index % 2 === 1}
                    name={presenter.name}
                    highlight={index === 0}
                    title={presenter.title}
                    company={presenter.company}
                    imageUrl={presenter.image.url}
                />
            ))}
        </div>
    );
};

const AllPrizeOwners = (props) => {
    const { presenters } = props;
    return (
        <div className="presenters-grid small">
            {presenters
                ?.filter((presenter) => presenter.image)
                .map((presenter, index) => (
                    <PrizeOwner
                        key={presenter.slug}
                        right={index % 2 === 1}
                        name={presenter.name}
                        highlight={index === 0}
                        title={presenter.title}
                        company={presenter.company}
                        imageUrl={presenter.image.url}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    />
                ))}
        </div>
    );
};

const PrizeOwners = () => {
    const [awardees] = useAllElements('presenters');
    const [showAll, setShowAll] = useState(false);

    if (!awardees) return null;

    const groupedAwardees = Object.entries(
        awardees.reduce((acc, awardee) => {
            const year = awardee.yearofaward;
            if (!year) return acc;

            if (!(year in acc)) acc[year] = [];
            acc[year].push(awardee);
            return acc;
        }, {})
    ).sort((a, z) => z[0] - a[0]);

    if (groupedAwardees.length === 0) return null;

    const [highlightedYear, highlightedAwardees] = groupedAwardees.shift();

    return (
        <Section id="dijazottak" container placeholder static>
            <Title>
                A {getHungarianYearPostfix(highlightedYear)} DÍJAZOTTAK
            </Title>
            <HighlightedPrizeOwners presenters={highlightedAwardees} />

            {groupedAwardees.length > 0 && (
                <>
                    {groupedAwardees.map(([year, presenters]) => (
                        <Fragment key={year}>
                            <Title style={{ marginTop: '5rem' }}>
                                A {getHungarianYearPostfix(year)} DÍJAZOTTAK
                            </Title>
                            <HighlightedPrizeOwners presenters={presenters} />
                        </Fragment>
                    ))}
                </>
            )}
        </Section>
    );
};

export default PrizeOwners;
