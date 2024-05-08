import React, { useEffect, useState } from 'react';
import HeroSec from '../../components/myHeroSec/HeroSec';
import MainTypeSec from '../../components/mainTypesSec/MainTypeSec';
import CarInterestSec from '../../components/carInterestSec/CarInterestSec';
import BrowseMakeSec from '../../components/browseMakeSec/BrowseMakeSec';
import EcoRideSec from '../../components/ecoRidesSec/EcoRideSec';
import RecentSec from '../../components/recentSec/RecentSec';
import { useQuery } from '@tanstack/react-query';
import { baseURL, currCountryCode } from '../../functions/BaseURL';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';

export default function MyHome() {
  const [showContent, setShowContent] = useState(true);
  const [currentData , setCurrentData] = useState(null)

  const { data , isError, error, isLoading } = useQuery({
    queryKey: ['car-home'],
    queryFn: async () => {
      const fetchData = await fetch(`${baseURL}/${currCountryCode}/cars`);
      const response = await fetchData.json();
      return response.data.cars;
    },
  });
  const bodyQuery = useQuery({
    queryKey: ['car-bodies'],
    queryFn: async () => {
      const fetchData = await fetch(`${baseURL}/${currCountryCode}/bodies`);
      const response = await fetchData.json();
      return response.data;
    }
  })
  const makesQuery = useQuery({
    queryKey: ['car-makes'],
    queryFn: async () => {
      const fetchData = await fetch(`${baseURL}/${currCountryCode}/makes`);
      const response = await fetchData.json();
      return response.data;
    }
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowContent(false);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [showContent]);

  return (
    <>
    {
      (isLoading || showContent ) ? 
        <Loader />
        : isError ? 
        <Error error={error} />
          :
        <>
          <HeroSec />
          <MainTypeSec />
          <CarInterestSec interestItems={bodyQuery?.data?.bodies} />
          <BrowseMakeSec browserItems={makesQuery?.data?.makes}  />
          <EcoRideSec />
          <RecentSec cars={data} />
          {/* <BriefAboutUs /> */}
        </>
      }
    </>
  )
}