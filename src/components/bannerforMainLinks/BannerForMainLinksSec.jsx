import React from 'react'
import './bannerForMainLinks.css'
import { NavLink } from 'react-router-dom'
import { currCountryCode } from '../../functions/BaseURL'
export default function BannerForMAinLinksSec({bannerItemsRealestate}) {

    return (
        <div className='BannerForMainLinksSec__handler'>
            <div className='eco__ride__Sec' style={{ backgroundImage: `url(${bannerItemsRealestate[0].image})` }}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="eco__ride__handler" >
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-12 d-flex justify-content-center align-items-center">
                                <div className="eco__text text-center">
                                    <h1>
                                        {
                                            bannerItemsRealestate[0].title
                                        }
                                    </h1>
                                    <p>
                                        {bannerItemsRealestate[0].disc}
                                    </p>
                                    <div className="eco__Btn__handler d-flex justify-content-center">
                                        <NavLink to={`/${currCountryCode}/discover/${bannerItemsRealestate[0].link}`} className="nav-link eco__btn">
                                            Discover
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
