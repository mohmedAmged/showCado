import React, { useEffect, useState } from 'react'
import './discoverCategoryPage.css'
import DynamicHero from '../../components/dynamicHeroPart/DynamicHero'
import { useParams } from 'react-router-dom';
import DynamicMapWeb from '../../components/dynamicMapWeb/DynamicMapWeb';
import DiscovercategoryList from '../../components/discoverCategoryList/DiscovercategoryList';
import Loader from '../../components/loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { baseURL, currCountryCode } from '../../functions/BaseURL';

export default function DiscoverCategoryPage() {
    const { categoryName } = useParams();
    const links = [
        { "label": 'Home', "route": `/${currCountryCode}` },
        { "label": 'Discover', "route": `/${currCountryCode}/discover` },
        { "label": `${categoryName}`, "route": `/${currCountryCode}/discover/${categoryName}` },
    ];

    const discoverHome = useQuery({
        queryKey: ['discover-home'],
        queryFn: async () => {
            const fetchData = await fetch(`${baseURL}/${currCountryCode}/discover`);
            const response = await fetchData.json();
            return response.data;
        },
    });

    const catgeoryFetched = discoverHome?.data?.ads?.ads_categories?.find((el) => el.name === categoryName)
    const discoversFetched = discoverHome?.data?.discoverCategories?.discoverCategories?.find((el) => el.name === categoryName)
    const [showContent, setShowContent] = useState(true);
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowContent(false);
        }, 800);
        return () => clearTimeout(timeoutId);
    });
    return (
        <div className='discoverCategSinglePage'>
            {
                (showContent) ?
                    <Loader />
                    :
                    <div className='discoverCategoryPage__handler'>
                        <DynamicHero title="Discover Everything"
                            description="Unleash curiosity and explore a world where every discovery is a journey in itself" />
                        <DynamicMapWeb links={links} />
                        <DiscovercategoryList  categoryName={categoryName} discoversFetched={discoversFetched} categoryFetched={catgeoryFetched} />
                    </div>
            }
        </div>
    )
}
