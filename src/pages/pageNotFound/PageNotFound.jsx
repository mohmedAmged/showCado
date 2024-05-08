import React, { useEffect, useState } from 'react'
import './pageNotFound.css'
import { useNavigate } from 'react-router-dom'
import notFoundImg from '../../assets/pageNotFoundImgs/404.webp'
import { currCountryCode } from '../../functions/BaseURL';
import Loader from '../../components/loader/Loader';
export default function PageNotFound({error}) {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(true);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowContent(false);
        }, 1000);
        return () => clearTimeout(timeoutId);
    });
    return (
        <>
            {
                (showContent) ?
                    <Loader />
                    :
                    <div className='pageNotFound__handler'>
                        <div className="overlay"></div>
                        <img src={notFoundImg} className='mt-3' alt="" />
                        <div className="pageNotFound__content">
                            <h1 className='pt-5'>{error? error : 'Page Not Found'}</h1>
                            <p className='my-6'>
                                Sorry, the page that you are looking for doesn't exist. Please make sure that you typed the correct URL page Link, and then try again.
                            </p>
                            <button className="nav-link pageNotFound__link" onClick={() => {
                                if (currCountryCode) {
                                    navigate(`/${currCountryCode}`)
                                } else {
                                    navigate('/')
                                }
                            }}>
                                go to home
                            </button>
                        </div>
                    </div>
                    }
        </>
    )
}
