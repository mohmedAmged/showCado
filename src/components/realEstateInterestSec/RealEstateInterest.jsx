import React from 'react'
import './realestateInterest.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Keyboard } from 'swiper/modules';
import palace from '../../assets/realestateIcons/icons8-palace-64.png';
import villa from '../../assets/realestateIcons/icons8-villa-64.png';
import apartment from '../../assets/realestateIcons/icons8-apartment-64.png';
import chalet from '../../assets/realestateIcons/icons8-chalet-50.png';
import { NavLink } from 'react-router-dom';
import { currCountryCode } from '../../functions/BaseURL';

export default function RealEstateInterest() {
    const interestItems = [
        {
            image: palace,
            id: 1,
            name: "Palace"
        },
        {
            image: villa,
            id: 2,
            name: "Villa"
        },
        {
            image: apartment,
            id: 3,
            name: "Apartment"
        },
        {
            image: chalet,
            id: 4,
            name: "chalet"
        },
    ]
    return (
        <div className='realEstate__handler'>
            <div className='car__interest__Sec mb-5'>
                <div className="container">
                    <div className="car__interest__handler">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="interest__text">
                                    <h1>
                                        Discover what you need by <span>Interest</span>
                                    </h1>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <Swiper
                                    keyboard={true}
                                    navigation={true}
                                    cssMode={true}
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    breakpoints={{
                                        320: {

                                            slidesPerView: 1,
                                            spaceBetween: 20
                                        },
                                        480: {

                                            slidesPerView: 2,
                                            spaceBetween: 20
                                        },
                                        600: {

                                            slidesPerView: 2,
                                            spaceBetween: 20
                                        },
                                        640: {
                                            slidesPerView: 3,
                                            spaceBetween: 30
                                        },
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    className="mySwiper px-4"
                                    modules={[Navigation, Keyboard]}
                                >
                                    {
                                        interestItems?.map((el) => {
                                            return (
                                                <SwiperSlide key={el?.id}>
                                                    <div className="box__Item__int__handler d-flex justify-content-center">
                                                        <div className="box__int__item">
                                                            <div className="img__int__item">
                                                                <img src={el?.image} alt="logo__car" />
                                                            </div>
                                                            <NavLink className="nav-link" to={`/${currCountryCode}/new-cars?body=${el.id}`}>
                                                                <p className='d-flex justify-content-center'>
                                                                    {el?.name}
                                                                </p>
                                                            </NavLink>
                                                            
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
