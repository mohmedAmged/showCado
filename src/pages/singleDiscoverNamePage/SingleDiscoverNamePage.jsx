import React, { useEffect, useState } from 'react'
import './singleDiscoverNamePage.css'
import Loader from '../../components/loader/Loader';
import DynamicHero from '../../components/dynamicHeroPart/DynamicHero';
import { useParams } from 'react-router-dom';
import DynamicMapWeb from '../../components/dynamicMapWeb/DynamicMapWeb';
import DiscoverNameSec from '../../components/discoverNameSec/DiscoverNameSec';
import { useQuery } from '@tanstack/react-query';
import { baseURL, currCountryCode } from '../../functions/BaseURL';
export default function SingleDiscoverNamePage({token}) {
    const { discoverName } = useParams();
    const links = [
        { "label": 'Home', "route": `/${currCountryCode}` },
        { "label": 'Discover', "route": `/${currCountryCode}/discover` },
        { "label": `${discoverName}`, "route": `/${currCountryCode}/${discoverName}` },
    ];
    const discoverHome = useQuery({
        queryKey: ['discover-home'],
        queryFn: async () => {
            const fetchData = await fetch(`${baseURL}/${currCountryCode}/discover`);
            const response = await fetchData.json();
            return response.data;
        },
    });
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
                        <DiscoverNameSec token={token} discoverHome={discoverHome?.data?.discovers
                        } />
                    </div>
            }
        </div>
    )
}
