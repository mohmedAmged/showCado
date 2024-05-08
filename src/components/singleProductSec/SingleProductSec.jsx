import React, { useState } from 'react'
import './singleProductSec.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import DynamicHeroSec from '../dynamicHeroSec/DynamicHeroSec'
import heroBg from '../../assets/dynamicHeroImgs/Conv.png'
import avatar from '../../assets/cardImgs/ava.jpg'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import DynamicMapWeb from '../dynamicMapWeb/DynamicMapWeb';
import { currCountryCode } from '../../functions/BaseURL';

export default function SingleProductSec({carDetails}) {

    const [mainImageSrc, setMainImageSrc] = useState(carDetails?.main_image); 

    const handleThumbnailClick = (newSrc) => {
        setMainImageSrc(newSrc);
    };

    const links = [
        { "label": 'Home', "route": `/${currCountryCode}` },
        { "label": 'cars', "route": `/${currCountryCode}/cars` },
        { "label": `${carDetails?.name}`, "route": `/${currCountryCode}/car-info/${carDetails?.id}` },
    ];
    return (
        <>
            <DynamicHeroSec backgroundImage={heroBg} title={`${carDetails?.name}`} content={`${carDetails?.name}`} />
            <DynamicMapWeb links={links}  />
            <div className='single__product__handler'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="right__content__handler">
                                <div className="card__list__titels">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <>
                                            <div className="card__title">

                                                <div className="label">
                                                    {carDetails?.condition}
                                                </div>
                                                {carDetails?.name}

                                            </div>
                                        </>
                                        <>
                                            <div className="cart__price ">
                                                <>
                                                    <div className="old__price">
                                                        ${carDetails?.price}
                                                    </div>
                                                    <div className="new__price">
                                                        ${carDetails?.offer_price}
                                                    </div>
                                                </>
                                            </div>
                                        </>
                                    </div>
                                </div>
                                <div className="product__slider_imgs">
                                    <Swiper
                                        style={{
                                            '--swiper-navigation-color': '#fff',
                                            '--swiper-pagination-color': '#fff',
                                        }}
                                        loop={true}
                                        spaceBetween={10}
                                        navigation={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper2"
                                    >
                                        <SwiperSlide>
                                            <div className="single__box__handler">
                                                <div className="single__img__handler">
                                                    <img className='img__view' src={mainImageSrc} alt="" />
                                                </div>
                                                {/* img__card__badge */}
                                                <div className={`img__card__badge ${carDetails?.ad_state === 'sold' ? 'soldBadge' : (carDetails.ad_state === 'sponsered' ? 'sponsoredBadge' : '')}`}>
                                                {carDetails?.ad_state}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                    <Swiper
                                        loop={true}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper mt-3"
                                    >
                                        {carDetails?.carImages?.map((carImage) => (
                                            <SwiperSlide key={carImage.id}>
                                                <img
                                                    className='img__list'
                                                    src={carImage?.image}
                                                    alt=""
                                                    onClick={() => handleThumbnailClick(carImage?.image)}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className="product__detailes">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="box__detail d-flex justify-content-between align-items-center">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Body</span>
                                                </div>
                                                <div className="item__title">
                                                    {carDetails?.body}
                                                </div>
                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span title='Transmission'>Transmission</span>
                                                </div>
                                                <div title='Manuel' className="item__title">
                                                    {carDetails?.transmission}
                                                </div>
                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Year</span>
                                                </div>
                                                <div title='2021' className="item__title">
                                                    {carDetails?.year}
                                                </div>
                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Color</span>
                                                </div>
                                                <div title='Obsidian Black Metallic' className="item__title">
                                                    {carDetails?.exterior}
                                                </div>

                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>History</span>
                                                </div>
                                                <div className="item__title">
                                                    {carDetails?.history}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="box__detail d-flex justify-content-between align-items-center">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Make</span>
                                                </div>
                                                <div title='BMW' className="item__title">
                                                    {carDetails?.make}
                                                </div>
                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Fuel</span>
                                                </div>
                                                <div title='Gasoline' className="item__title">
                                                    {carDetails?.fuel_type}
                                                </div>
                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Mileage</span>
                                                </div>
                                                <div title='50000 mi' className="item__title">
                                                    {carDetails?.mileage} mi
                                                </div>
                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Interior</span>
                                                </div>
                                                <div title='Grey' className="item__title">
                                                    {carDetails?.interior}
                                                </div>
                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Stock</span>
                                                </div>
                                                <div title='153093' className="item__title">
                                                    {carDetails?.stockId}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <div className="box__detail d-flex justify-content-between align-items-center">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Body</span>
                                                </div>
                                                <div className="item__title">
                                                    {carDetails?.body}
                                                </div>
                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Model</span>
                                                </div>
                                                <div title='M5' className="item__title">
                                                    {carDetails?.model}
                                                </div>
                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Engine</span>
                                                </div>
                                                <div title='6,2L V8' className="item__title">
                                                    {carDetails?.engine}
                                                </div>
                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Drive</span>
                                                </div>
                                                <div title='RWD' className="item__title">
                                                    {carDetails?.drive}
                                                </div>
                                            </div>
                                            <div className="box__detail d-flex justify-content-between">
                                                <div className="item__label d-flex align-items-center">
                                                    <i className="bi bi-car-front-fill"></i>
                                                    <span>Register</span>
                                                </div>
                                                <div title='N/A' className="item__title">
                                                    {carDetails?.register}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product__features">
                                    <h1>Features</h1>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-6 col-sm-12">
                                            <div className="feature__box">
                                                <h4>Comfort</h4>
                                                <ul>
                                                    {carDetails?.carFeatures?.comfort?.map((feature) => (
                                                        <li key={feature?.id}>
                                                            <i className="bi bi-check-circle-fill"></i>
                                                            <span>{feature?.name}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12">
                                            <div className="feature__box">
                                                <h4>Entertainment</h4>
                                                <ul>
                                                    {carDetails?.carFeatures?.entertainment?.map((feature) => (
                                                        <li key={feature?.id}>
                                                            <i className="bi bi-check-circle-fill"></i>
                                                            <span>{feature?.name}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12">
                                            <div className="feature__box">
                                                <h4>Safety</h4>
                                                <ul>
                                                    {carDetails?.carFeatures?.safety?.map((feature) => (
                                                        <li key={feature?.id}>
                                                            <i className="bi bi-check-circle-fill"></i>
                                                            <span>{feature?.name}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12">
                                            <div className="feature__box">
                                                <h4>Seats</h4>
                                                <ul>
                                                    {carDetails?.carFeatures?.seats?.map((feature) => (
                                                        <li key={feature?.id}>
                                                            <i className="bi bi-check-circle-fill"></i>
                                                            <span>{feature?.name}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product__seller__notes">
                                    <h1>
                                        SELLER'S NOTES
                                    </h1>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <p>
                                                {carDetails?.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="left__content__handler">
                                <div className="dellar__info">
                                    <div className="user__main__info d-flex">
                                        <div className="user__img">
                                            <img src={avatar} alt="" />
                                        </div>
                                        <div className="user__name">
                                            <h3>{carDetails?.carFeatures?.dealer.name}</h3>
                                            <p>{carDetails?.carFeatures?.dealer.type} seller</p>
                                        </div>
                                    </div>
                                    <div className="dellar__contacts">
                                        <div className="dellar__contact__item phone">
                                            <i className="bi bi-telephone-fill"></i>
                                            <span>{carDetails?.carFeatures?.dealer?.phone}</span>
                                        </div>
                                        <div className="dellar__contact__item whatsapp">
                                            <a href="https://wa.me/01005322028" target="_blank">
                                                <div className="whatsapp__btn">
                                                    <i className="bi bi-whatsapp"></i>
                                                    <span>CHAT VIA WHATSAPP</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="dellar__contact__item mail">
                                            <a href={`mailto:${carDetails?.carFeatures?.dealer?.email}`}>
                                                <div className="email__btn">
                                                    <i className="bi bi-envelope-fill"></i>
                                                    <span>Message To Dealer</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="dellar__location">
                                        <div className="single__location__text">
                                            <i className="bi bi-geo-alt-fill"></i>
                                            <span>{carDetails?.carFeatures?.dealer?.address}</span>
                                        </div>
                                        <div className="map__Sec">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188820.14154020514!2d-70.80547133590112!3d42.31448584962796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3652d0d3d311b%3A0x787cbf240162e8a0!2z2KjZiNiz2LfZhtiMINmF2KfYs9in2KrYtNmI2LPYqtiz2Iwg2KfZhNmI2YTYp9mK2KfYqiDYp9mE2YXYqtit2K_YqQ!5e0!3m2!1sar!2seg!4v1701180541810!5m2!1sar!2seg"
                                                title='map_sec'
                                                style={{ border: '0' }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="message__Dellar__Sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-12 col-sm-12">
                                <div className="box__message__info">
                                    <div className="user__main__info d-flex">
                                        <div className="user__img">
                                            <img src={avatar} alt="" />
                                        </div>
                                        <div className="user__name">
                                            <h3>{carDetails?.carFeatures?.dealer?.name}</h3>
                                            <p>{carDetails?.carFeatures?.dealer?.type} seller</p>
                                        </div>
                                    </div>
                                    <div className="dellar__contacts">
                                        <div className="dellar__contact__item phone">
                                            <i className="bi bi-telephone-fill"></i>
                                            <span>{carDetails?.carFeatures?.dealer?.phone}</span>
                                        </div>
                                        <div className="dellar__contact__item whatsapp">
                                            <a href={`https://wa.me/${carDetails?.carFeatures?.dealer?.phone}`} target="_blank">
                                                <div className="whatsapp__btn">
                                                    <i className="bi bi-whatsapp"></i>
                                                    <span>CHAT VIA WHATSAPP</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12 col-sm-12">
                                <div className="form__dellar__contact">
                                    <div className="form__title">
                                        MESSAGE TO DEALER
                                    </div>
                                    <div className="form__contact">
                                        <form action="">
                                            <textarea className="form-control" rows="6" placeholder="your message"></textarea>
                                            <div className="form__inputs row" >
                                                <div className="my-3 col-lg-4">
                                                    <label className="">Name</label>
                                                    <input type="name" className="form-control" placeholder="your name" />
                                                </div>
                                                <div className="my-3 col-lg-4">
                                                    <label className="">Email</label>
                                                    <input type="email" className="form-control" placeholder="your email" />
                                                </div>
                                                <div className="my-3 col-lg-4">
                                                    <label className="">Number</label>
                                                    <input type="name" className="form-control" placeholder="your number" />
                                                </div>
                                            </div>
                                            <div className="form__submit">
                                                <div className="mb-3 form-check d-flex align-items-center">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" htmlFor="exampleCheck1">I accept the privacy policy</label>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Send Message</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
