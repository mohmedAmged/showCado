import React, { useEffect, useState } from 'react'
import './realEstateHome.css'
import { useQuery } from '@tanstack/react-query';
import { baseURL, currCountryCode } from '../../functions/BaseURL';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';

import RealEstateInterest from '../../components/realEstateInterestSec/RealEstateInterest';
import HeroSecMainLinks from '../../components/heroSecMainLinks/HeroSecMainLinks';
import BannerForMainLinksSec from '../../components/bannerforMainLinks/BannerForMainLinksSec';
export default function RealEstateHome({interestItems, bannerItemsRealestate, heroItems}) {
    const [showContent, setShowContent] = useState(true);
    const [currentData, setCurrentData] = useState(null)

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['car-home'],
        queryFn: async () => {
            const fetchData = await fetch(`${baseURL}/${currCountryCode}/cars`);
            const response = await fetchData.json();
            return response.data.cars;
        },
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowContent(false);
        }, 800);

        return () => clearTimeout(timeoutId);
    }, [showContent]);


    return (
        <>
            {
                (isLoading || showContent) ?
                    <Loader />
                    : isError ?
                        <Error error={error} />
                        :
                        <>
                            <HeroSecMainLinks heroItems={heroItems}/>
                            <RealEstateInterest interestItems={interestItems}/>
                            <BannerForMainLinksSec bannerItemsRealestate={bannerItemsRealestate}/>
                        </>
            }
        </>
    )
}
