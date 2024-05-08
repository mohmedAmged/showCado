import React from 'react'
import './ecoRideSec.css'
import { NavLink } from 'react-router-dom'
export default function EcoRideSec() {
    return (
        <div className='eco__ride__Sec'>
            <div className="overlay"></div>
            <div className="container">
                <div className="eco__ride__handler">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-12 d-flex justify-content-center align-items-center">
                            <div className="eco__text text-center">
                                <h1>
                                    eco rides
                                </h1>
                                <p>
                                    Deiscover our eco-friendly selection, including hybrids and electric cars, fo a greener driving experience
                                </p>
                               <div className="eco__Btn__handler d-flex justify-content-center">
                               <NavLink className="nav-link eco__btn">
                                    go green
                                </NavLink>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
