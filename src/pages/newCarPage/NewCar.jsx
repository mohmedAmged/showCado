import React, { useEffect, useState } from 'react';
import './newCar.css';
import DynamicHeroSec from '../../components/dynamicHeroSec/DynamicHeroSec';
import heroBg from '../../assets/dynamicHeroImgs/Conv.png';
import ShopSec from '../../components/shopSec/ShopSec';
import { baseURL, currCountryCode } from '../../functions/BaseURL';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import DynamicMapWeb from '../../components/dynamicMapWeb/DynamicMapWeb';
import { useLocation } from 'react-router-dom';

export default function NewCar() {
  const location = useLocation()
  const getconditionFromUrl = (arr) => {
    let myObj = {}
    const searchArr = [...arr];
    const withoutQuestionMark = searchArr.slice(1, (searchArr.length));
    const searchArrWithoutAnyThing = withoutQuestionMark.join("").split("&")
    searchArrWithoutAnyThing.forEach((e) => {
      const elementArray = e.split("=");
      myObj = ({
        ...myObj,
        [elementArray[0]]: elementArray[1]
      });
    })
    return myObj.condition;
  }
  const [showContent, setShowContent] = useState(true);
  const bodyQuery = useQuery({
    queryKey: ['cars-bodies'],
    queryFn: async () => {
      const fetchData = await fetch(`${baseURL}/${currCountryCode}/bodies`);
      const response = await fetchData.json();
      return response?.data;
    },
  });
  const makesQuery = useQuery({
    queryKey: ['cars-makes'],
    queryFn: async () => {
      const fetchData = await fetch(`${baseURL}/${currCountryCode}/makes`);
      const response = await fetchData.json();
      return response?.data;
    },
  });
  const priceQuery = useQuery({
    queryKey: ['price'],
    queryFn: async () => {
      const fetchData = await fetch(`${baseURL}/${currCountryCode}/car-price`);
      const response = await fetchData.json();
      return response?.data;
    },
  });
  const carQuery = useQuery({
    queryKey: ['carsFull'],
    queryFn: async () => {
      const fetchData = await fetch(`${baseURL}/${currCountryCode}/cars`);
      const response = await fetchData.json();
      return response?.data;
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowContent(false);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [showContent]);

  const links = [
    { "label": 'Home', "route": `/${currCountryCode}` },
    { "label": 'cars', "route": `/${currCountryCode}/cars` },
    { "label": 'New Cars', "route": `/${currCountryCode}/new-cars` },
  ];
  return (
    <>
      {
        (priceQuery?.isLoading || carQuery?.isLoading || makesQuery?.isLoading || bodyQuery?.isLoading || showContent) ?
          <Loader />
          :
          (priceQuery?.isError || carQuery?.isError || makesQuery?.isError || bodyQuery?.isError) ?
            <Error error={priceQuery?.error || carQuery?.error || makesQuery?.error || bodyQuery?.error} />
            :
            <>
              <DynamicHeroSec backgroundImage={heroBg} title={`${getconditionFromUrl(location.search) ? getconditionFromUrl(location.search) + ' cars' : 'all cars'}`} content={`${getconditionFromUrl(location.search) ? getconditionFromUrl(location.search) + ' cars' : 'all cars'}`} />
              <DynamicMapWeb links={links} />
              <ShopSec cars={carQuery?.data?.cars} makes={makesQuery?.data?.makes} bodies={bodyQuery?.data?.bodies} priceQuery={priceQuery} />
            </>

      }
    </>
  );
};
