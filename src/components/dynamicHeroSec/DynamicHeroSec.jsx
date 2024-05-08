import React from 'react'
import './dynamicHeroSec.css'
import { scrollToTop } from '../../functions/scrollToTop';
import { NavLink } from 'react-router-dom';
export default function DynamicHeroSec({ backgroundImage, title, content }) {
    const style = {
        backgroundImage: `url(${backgroundImage})`,
    };
    return (
        <>
            <div className=''>
                <div style={style} className="dynamic__hero__img__banner d-flex justify-content-start align-items-center">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className='dynamic__hero__text__box'>
                            <div className="dynamic__hero__text">
                                <h1>
                                    {title}
                                </h1>
                                <p>
                                    <NavLink onClick={() => scrollToTop()} to="/" className="nav-link text-light d-inline">Home</NavLink> / {content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
