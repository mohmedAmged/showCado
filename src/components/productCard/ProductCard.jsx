import React from 'react'
import './productCard.css'
import CartTop from '../cartTop_part/CartTop'
import { NavLink } from 'react-router-dom'
import { scrollToTop } from '../../functions/scrollToTop';
import { currCountryCode } from '../../functions/BaseURL';
export default function ProductCard({carInfo}) {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="recent__cart__item">
                <CartTop carTopInfo={carInfo} />
                <div className="cart__bottom mt-2">
                    <div className="cart__main__titels">
                        <div className="d-flex align-items-center justify-content-between">
                            <>
                                <div className="cart__title">
                                    <NavLink to={`/${currCountryCode}/car-info/${carInfo?.id}`}
                                    className="nav-link"
                                    onClick={() => {
                                        scrollToTop();
                                    }}
                                    >
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
                    <div className="cart__list__meta">
                        <span>{carInfo?.year}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
