import { SiteClient } from 'datocms-client';
import { useQuery as useDatoQuery } from 'graphql-hooks';
import { useQuerySubscription } from 'react-datocms';

export const token = '7c7cb63b2a47fef9d2c7a1e462f78f';

export const useStaticElement = (staticTextField, isStructuredText = true) => {
    const valueProperty = isStructuredText ? '{value }' : '';
    const DATOCMS_QUERY = `
		query AppQuery {
			staticelement  {
				${staticTextField} 
				${valueProperty}
			}
		}`;

    const { error, data } = useQuerySubscription({
        enabled: true,
        query: DATOCMS_QUERY,
        token
    });

    return [
        data?.staticelement[staticTextField].value ??
            data?.staticelement[staticTextField]
    ];
};

export const useAllElements = (model) => {
    const modelQueryRecordCount = {
        presenters: `        
            _allSpeakersMeta {
              count
            }
        `,
        stages: `
            _allStagesMeta {
                count
            }
        `
    };
    const DATOCMS_QUERY_RECORD_COUNT = `
        query AppQuery {
            ${modelQueryRecordCount[model]} 
        }`;

    const [dataCount] = useQuery(DATOCMS_QUERY_RECORD_COUNT);

    const modelQuery = {
        presenters: `
            allSpeakers( first: ${dataCount?.count ?? 0} ) 
                {
                    name
                    slug
                    highlighted
                    title
                    company
                    yearofaward
                    image {
                        url
                    }
                }
        `,
        stages: `
            allStages(orderBy: [order_ASC]) {
                id
                name
                online
                schedule {
                    id
                    start
                    title
                    description
                    speaker {
                        id
                        company
                        name
                        title
                        image {
                            url
                        }
                    }
                    break
                }
            }       
        `
    };
    const DATOCMS_QUERY = `
        query AppQuery {
            ${modelQuery[model]} 
        }`;

    const [data] = useQuery(DATOCMS_QUERY);

    //console.log("dataCount", dataCount)
    //console.log("DATOCMS_QUERY", DATOCMS_QUERY)
    return [data];
};

const useQuery = (query) => {
    const { error, data } = useQuerySubscription({
        query,
        token
    });

    //if (error) console.log("error", error, query)
    return [data && data[Object.keys(data)[0]]];
};

export const useStatQuery = (statType) => {
    let query = `
        query onsiteQuery {
            _allRegistrationsMeta(filter: {onsite: {eq: "true"}}){
            count
            }
        }
    `;
    const { error: onsiteError, data: onsite } = useQuerySubscription({
        query,
        token
    });

    query = `
        query onsiteQuery {
            _allRegistrationsMeta(filter: {onsite: {eq: "false"}}){
            count
            }
        }
`;
    const { error: onlineError, data: online } = useQuerySubscription({
        query,
        token
    });

    query = `
    query onsiteQuery {
        _allRegistrationsMeta {
        count
        }
    }
`;
    const { error: allError, data: all } = useQuerySubscription({
        query,
        token
    });

    return [onsite, online, all];
};

export const getSponsorCategories = async () => {
    const client = SiteClient(token);
    console.log('Downloading records...');
    const sponsors = await client.items.all(
        {
            filter: {
                type: 'sponsor'
            }
        },
        { allPages: true }
    );
    const sponsorCategories = await client.items.all(
        {
            filter: {
                type: 'sponsor_category'
            }
        },
        { allPages: true }
    );
    const sponsorCategoriesWithSponsors = sponsorCategories.map((category) => {
        const _sponsors = sponsors.filter((sponsor) =>
            category.sponsor.includes(sponsor.id)
        );
        category.sponsors = _sponsors;
        return category;
    });

    //console.log({sponsor});
    return sponsorCategoriesWithSponsors;
};

export const useSponsorCategories = () => {
    const QUERY = `{    allSponsorCategories {
        id
        name
        sponsor {
          name
          logo {
            url
          }
          url
        }
        position
      }}`;
    const { loading, error, data } = useDatoQuery(QUERY, {
        variables: {
            limit: 10
        }
    });
    return data ? data.allSponsorCategories : [];
};
