import React, { useEffect, useState } from 'react'
import './singleProductPage.css'
import SingleProductSec from '../../components/singleProductSec/SingleProductSec';
import { baseURL, currCountryCode } from '../../functions/BaseURL';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/loader/Loader';
import Error from '../../components/error/Error';
import { useParams } from 'react-router-dom';
import PageNotFound from '../pageNotFound/PageNotFound';

export default function SingleProductPage() {
  const { carId } = useParams();

  const [showContent, setShowContent] = useState(true);

  const { data, isError, isLoading , error } = useQuery({
    queryKey: ['car-details'],
    queryFn: async () => {
      const fetchData = await fetch(`${baseURL}/${currCountryCode}/cars/${carId}`);
      const response = await fetchData.json();
      return response.data;
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
      : (isError || data.length === 0) ?
      <PageNotFound error={error || 'No Car Is Available'} />
      : 
      <>
        <SingleProductSec carDetails={data} />
      </>
    }
    </>
  )
}
