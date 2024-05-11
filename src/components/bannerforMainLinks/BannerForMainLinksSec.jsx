import React from 'react'
import './bannerForMainLinks.css'
import { NavLink } from 'react-router-dom'
import { currCountryCode } from '../../functions/BaseURL'

export default function BannerForMAinLinksSec() {
    return (
        <div className='BannerForMainLinksSec__handler'>
            <div className='eco__ride__Sec'>
                <div className="overlay"></div>
                <div className="container">
                    <div className="eco__ride__handler">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-12 d-flex justify-content-center align-items-center">
                                <div className="eco__text text-center">
                                    <h1>
                                        Real Estate
                                    </h1>
                                    <p>
                                        Discover homes with warranty-backed assurance and verified
                                        sellers for a trustworthy real estate experience.
                                    </p>
                                    <div className="eco__Btn__handler d-flex justify-content-center">
                                        <NavLink to={`/${currCountryCode}/discover/Real Estate`} className="nav-link eco__btn">
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
