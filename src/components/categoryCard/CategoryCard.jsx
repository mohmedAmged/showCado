import React from 'react'
import './categoryCard.css'
import { NavLink } from 'react-router-dom'
import { scrollToTop } from '../../functions/scrollToTop';
import { currCountryCode } from '../../functions/BaseURL';
export default function CategoryCard({ category, imgSrc, adsCount, subcategories, iconclassName }) {

    return (
        <div className='col-lg-4 col-md-6 col-sm-12'>
            <div className="discover__category__card__box">
                <figure>
                    <div className="discover__categ__img">
                        <img src={imgSrc} alt="" />
                        <div className="overlay"></div>
                        <span>
                            {/* <i className={iconclassName}></i> */}
                            <img className='ads__icon' src={iconclassName} alt="" />
                        </span>
                    </div>
                    <div className="discover__categ__info">
                        <NavLink to={`/${currCountryCode}/discover/${category}`} className="nav-link"
                            onClick={() => {
                                scrollToTop();
                            }}
                        >
                            <h4>{category}</h4>
                        </NavLink>
                        <p>{`${adsCount} Ads posted`}</p>
                        <ul>
                            {subcategories?.slice(0, 3)?.map((subcategory, index) => (
                                <li key={index}>
                                    <NavLink className="nav-link">
                                        <i className="bi bi-chevron-right"></i>
                                        {subcategory.sub_name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <div className="discover__view">
                            <NavLink
                                to={`/${currCountryCode}/discover/${category}`}
                                onClick={() => {
                                    scrollToTop();
                                }}
                                className="nav-link">
                                view all ads
                                <i className="bi bi-arrow-right"></i>
                            </NavLink>
                        </div>
                    </div>
                </figure>
            </div>
        </div>
    );
}
