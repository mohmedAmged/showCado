import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader';
import FixedPopUp from '../../components/fixedPopUp/FixedPopUp';
import HomeMainHero from '../../components/homeMainHero/HomeMainHero';
import { currCountryCode } from '../../functions/BaseURL';
import { useNavigate } from 'react-router-dom';

export default function DefaultPage({countriesData}) {
    const [showContent, setShowContent] = useState(true);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowContent(false);
        }, 800);
        return () => clearTimeout(timeoutId);
    });
  return (
    <>
    {
        (showContent) ?
        <Loader />
        : 
        <div className='mainHome__handler position-relative'>
            <FixedPopUp  countriesData={countriesData}/>
            <HomeMainHero
                title="Infinite Horizons: Your Gateway to Limitless Discoveries and Opportunities!"
                description="Uncover the extraordinary—explore new offers, cars, votes, sponsorships, and more, all in one dynamic platform for users and business owners alike!" 
            />
        </div>
    }
    </>
  )
}
