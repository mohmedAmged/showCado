import React from 'react';
import CartTop from '../cartTop_part/CartTop';
import { NavLink } from 'react-router-dom';
import './listCardItems.css';
import { scrollToTop } from '../../functions/scrollToTop';
import { currCountryCode } from '../../functions/BaseURL';

export default function ListCardItems({carInfo}) {
    return (
        <div className='col-lg-12'>
            <div className="list__card__items">
                <div className="row">
                    <div className="col-lg-4">
                        <CartTop carTopInfo={carInfo} />
                    </div>
                    <div className="col-lg-8">
                        <div className="card__list__info__box">
                            <div className="card__list__titels">
                                <div className="d-flex align-items-center justify-content-between">
                                    <>
                                        <div className="card__title">
                                            <NavLink to={`/${currCountryCode}/car-info/${carInfo?.id}`} className="nav-link"
                                            onClick={() => {
                                                scrollToTop();
                                            }}
                                            >
                                                <div className="label">
                                                Certified Used 2021 
                                                </div>
                                                {carInfo?.name}
                                            </NavLink>
                                        </div>
                                    </>
                                    <>
                                        <div className="cart__price">
                                            <div className="old__price">
                                                ${carInfo?.price}
                                            </div>
                                            <div className="new__price">
                                                ${carInfo?.offer_price}
                                            </div>
                                        </div>
                                    </>
                                </div>
                            </div>
                            <div className="card__list__middle row justify-content-between">
                                <div className="col-lg-3 col-md-3 col-sm-12 boxList__middle d-flex list__card__adjust__height">
                                    <div className="middle__icon">
                                        <i className="bi bi-fuel-pump-fill"></i>
                                    </div>
                                    <div className="middle__desc">
                                        <div className="type">fuel type</div>
                                        <div className="name" title={`${carInfo?.fuel_type}`}>{carInfo?.fuel_type}</div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 boxList__middle d-flex list__card__adjust__height">
                                    <div className="middle__icon">
                                        <i className="bi bi-fuel-pump-fill"></i>
                                    </div>
                                    <div className="middle__desc">
                                        <div className="type">engine</div>
                                        <div className="name" title={`${carInfo?.engine}`}>{carInfo?.engine}</div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 boxList__middle d-flex list__card__adjust__height">
                                    <div className="middle__icon">
                                        <i className="bi bi-fuel-pump-fill"></i>
                                    </div>
                                    <div className="middle__desc">
                                        <div className="type">Mileage</div>
                                        <div className="name" title={`${carInfo?.mileage}`}>{carInfo?.mileage}</div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 boxList__middle d-flex list__card__adjust__height">
                                    <div className="middle__icon">
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </div>
                                    <div className="middle__desc">
                                        <div className="type">location</div>
                                        <div className="name" title={`${carInfo?.dealer_address}`}>{carInfo?.dealer_address}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="card__list__bottom">
                                <div className="dellar__info d-flex">
                                    <div className="dellar__img">
                                        <img src={carInfo?.dealer_image} alt="" />
                                    </div>
                                    <div className="dellar__info">
                                        <div className="dellar__name">
                                        {carInfo?.dealer_type}: <span>{carInfo?.dealer_name}</span>
                                        </div>
                                        <div className="dellar__phone">
                                            <i className="bi bi-telephone-fill"></i>
                                            <span>{carInfo?.dealer_phone}</span>
                                        </div>
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
