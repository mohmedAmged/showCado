import React from 'react';
import './mainTypeSec.css';
import { NavLink } from 'react-router-dom';
import { currCountryCode } from '../../functions/BaseURL';
export default function MainTypeSec() {

    return (
        <div className='main__types__sec px-5'>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-6 mb-3 d-flex justify-content-center align-items-center">
                        <div className="box__item__type p-4 blue__box">
                            <div className="box__contents">
                                <h1>
                                    find New car
                                </h1>
                                <p className=''>
                                    Explore brand mew cars provide by official dealers in cyprus, available <span>Today</span>, and make one yours
                                </p>
                                <div className="d-flex justify-content-start align-items-center w-100">
                                    <NavLink to={`/${currCountryCode}/new-cars?condition=new`} className="nav-link btn__type w-80">
                                        new cars
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 mb-3 d-flex justify-content-center align-items-center">
                        <div className="box__item__type p-4 red__box">
                            <div className="box__contents">
                                <h1>
                                    certified used cars
                                </h1>
                                <p className=''>
                                    Your go-to destination for CPO cars in cyprus, offering detailed insights to help you find vicheles with confidence
                                </p>
                                <div className=" d-flex justify-content-start align-items-center w-100 used__btn">
                                    <NavLink className="nav-link btn__type w-80" to={`/${currCountryCode}/new-cars?condition=used`}>
                                        used cars
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
