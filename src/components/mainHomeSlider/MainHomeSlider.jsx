import React from 'react'
import './mainHomeSlider.css'
import { NavLink } from 'react-router-dom';
import { scrollToTop } from '../../functions/scrollToTop';
export default function MainHomeSlider({ homeSliderItems }) {
    // console.log(homeSliderItems);
    return (
        <div className='mainHomeSlider__handler my-5'>
            <div className="container">
                <div className="mainHomeSlider__cards">
                    <div className="row">
                        {
                            homeSliderItems.map((item) => (
                                <div className="col-lg-6 col-md-6 col-sm-12 mb-5" key={item.title}>
                                    <div className={`mainHomeSlider__card__item ${item.cardBg} `}>
                                        <div className="mainHomeSlider__card__title mb-4">
                                            <h2>
                                                {item.title}
                                            </h2>
                                        </div>
                                        <div className="mainHomeSlider__card__links">
                                            <ul>
                                                {
                                                    item.subCategory.map((el) => (
                                                        <li className='px-4 pb-2' key={el.subTitle}>
                                                            <NavLink to={el.subLink}
                                                                onClick={() => {
                                                                    scrollToTop();
                                                                }} className="nav-link">
                                                                {/* <i className="bi bi-emoji-wink-fill "></i> */}
                                                                <span>{el.subTitle}</span>
                                                            </NavLink>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div className="mainHomeSlider__card__icon">
                                            <NavLink to={item.mainLink}
                                                onClick={() => {
                                                    scrollToTop();
                                                }}
                                                className="nav-link">
                                                <i className="bi bi-arrow-right fs-3"></i>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}
