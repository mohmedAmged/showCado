import React, { useEffect, useState } from 'react';
import './myMainHome.css';
import MainHomeSlider from '../../components/mainHomeSlider/MainHomeSlider';
import HomeMainHero from '../../components/homeMainHero/HomeMainHero';
import { useQuery } from '@tanstack/react-query';
import { baseURL, currCountryCode} from '../../functions/BaseURL';
import Loader from "../../components/loader/Loader";
import Error from '../../components/error/Error';
import DiscoverSliderForMarket from '../../components/discoverSliderForMarket/DiscoverSliderForMarket';
import { useParams } from 'react-router-dom';
export default function MyMainHome() {
    const { carId } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['car-home'],
        queryFn: async () => {
            const fetchData = await fetch(`${baseURL}/${currCountryCode}/cars`);
            const response = await fetchData.json();
            return response.data;
        },
    });

    const updatedCarSlide = data?.cars?.map(car => ({
        id: car.id,
        category: car.name,
        image: car.main_image
    })) || [];

    const carSlide = [];
    const mergedCarSlide = [...carSlide, ...updatedCarSlide];
    const [showContent, setShowContent] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowContent(false);
        }, 800);
        return () => clearTimeout(timeoutId);
    });

    const discoverData = useQuery({
        queryKey: ['discover-home-recomended-sub-categories'],
        queryFn: async () => {
            const fetchData = await fetch(`${baseURL}/${currCountryCode}/recommend-sub-categories`);
            const response = await fetchData.json();
            return response.data;
        },
    });
    const discoversubData = useQuery({
        queryKey: ['discover-categories'],
        queryFn: async () => {
            const fetchData = await fetch(`${baseURL}/${currCountryCode}/discover-categories`);
            const response = await fetchData.json();
            return response.data;
        },
    });
    const discoverFetchedCategs = discoversubData?.data?.discoverCategories?.map((el)=>el?.name)
    const homeSliderItems = [
        {
            "title": "Warranty cars",
            "cardBg": "first__Bg",
            "mainLink": `/${currCountryCode}/cars`,
            "subCategory": [
                {
                    "subTitle": "new cars",
                    "subLink": `/${currCountryCode}/new-cars?condition=new`
                },
                {
                    "subTitle": "used cars",
                    "subLink": `/${currCountryCode}/new-cars?condition=used`
                },
            ],
    
        },
        {
            "title": "Discover everything",
            "mainLink": `/${currCountryCode}/discover`,
            "cardBg": "second__Bg",
            "subCategory": [
            ],
        },
        {
            "title": "save anything",
            "mainLink": `/${currCountryCode}/save`,
            "cardBg": "third__Bg",
            "subCategory": [
                {
                    "subTitle": "Tech Treats",
                    "subLink": `/${currCountryCode}/save/Get%20Your%20Coupon%20Now`
                },
                {
                    "subTitle": "Fashion Finds",
                    "subLink": `/${currCountryCode}/save/Get%20Your%20Coupon%20Now`
                },
                {
                    "subTitle": "Hotels & Travel",
                    "subLink": `/${currCountryCode}/save/Exclusive%20Coupons`
                },
                {
                    "subTitle": "Beauty & Spas",
                    "subLink": `/${currCountryCode}/save/Exclusive%20Coupons`
                },
                {
                    "subTitle": "Automotive",
                    "subLink": `/${currCountryCode}/save/Exclusive%20Coupons`
                },
                {
                    "subTitle": "Food & Drink",
                    "subLink": `/${currCountryCode}/save/Exclusive%20Coupons`
                },
            ],
        },
        {
            "title": "gain points",
            "mainLink": `/${currCountryCode}/user/dashboard`,
            "cardBg": "forth__Bg",
            "subCategory": [
                {
                    "subTitle": "gain",
                    "subLink": `/${currCountryCode}/user/dashboard`
                },
                {
                    "subTitle": "donations",
                    "subLink": `/${currCountryCode}/user/dashboard`
                },
            ],
        },
    ]
    discoverFetchedCategs?.map((el)=>{
        homeSliderItems[1]?.subCategory?.push({
            "subTitle": el,
            "subLink": `/${currCountryCode}/discover/${el}`
        })
    })
    const navigateLink = `/${currCountryCode}/car-Info`
    const navigateLinkTwo = `/${currCountryCode}`
    
    return (
        <>
            {
                (isLoading || discoverData.isLoading || showContent) ?
                    <Loader />
                    : (discoverData.isError || isError) ?
                        <Error /> :
                        <div className='mainHome__handler position-relative'>
                            <HomeMainHero
                                title="Infinite Horizons: Your Gateway to Limitless Discoveries and Opportunities!"
                                description="Uncover the extraordinary—explore new offers, cars, votes, sponsorships, and more, all in one dynamic platform for users and business owners alike!" />
                                <>
                                    <MainHomeSlider homeSliderItems={homeSliderItems} />
                                    <DiscoverSliderForMarket title="Most recent cars" subtitle="warranty-valid cars" slides={mergedCarSlide}  
                                    navigateLink={navigateLink} 
                                    useCategoryId={true}
                                    />
                                    {discoverData?.data?.recommendedSubCategories?.map((subCategory, index) => (
                                    <DiscoverSliderForMarket
                                        key={index}
                                        title={`Most recommended ${subCategory.name} in country`}
                                        subtitle="Discover the best places"
                                        navigateLink={navigateLinkTwo}
                                        useCategoryId={false}
                                        slides={subCategory?.discovers?.map(discover => ({
                                        id: discover.discover_id,
                                        category: discover.discover_name,
                                        image: discover.discover_image,
                                        }))}
                                    />
                                    ))}
                                </>
                        </div>
            }
        </>
    )
}