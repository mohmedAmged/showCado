import React from 'react'
import './discoverSlider.css'
import Autoplay from "../../../node_modules/swiper/modules/autoplay.mjs";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/autoplay";
import { useNavigate } from 'react-router-dom';
import { currCountryCode } from '../../functions/BaseURL';
import { scrollToTop } from '../../functions/scrollToTop';
export default function DiscoverSlider({ title, subtitle, slides, titleCateg }) {
    const navigate = useNavigate()
    return (
        <div className="discoverSlider__handler">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-md-8 col-sm-12">
                        <div className="discoverSlider__head">
                            <h3>{title}</h3>
                            <p>{subtitle}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="discoverSlider__cards">
                            <Swiper
                                modules={[Autoplay]}
                                slidesPerView={1}
                                spaceBetween={10}
                                autoplay={{
                                    delay: 2500,
                                    pauseOnMouseEnter: true,
                                    disableOnInteraction: false
                                }}
                                // loop
                                breakpoints={{
                                    320: {

                                        slidesPerView: 1.5,
                                        spaceBetween: 20
                                    },
                                    480: {

                                        slidesPerView: 2,
                                        spaceBetween: 20
                                    },
                                    600: {

                                        slidesPerView: 3.5,
                                        spaceBetween: 30
                                    },
                                    640: {
                                        slidesPerView: 2.5,
                                        spaceBetween: 30
                                    },
                                }}
                                className="mySwiper">
                                {slides.map((slide) => (
                                    <SwiperSlide key={slide.id}>
                                        <div className="discoverSlider__card__item">
                                            <div className="overlay"></div>
                                            <div className="discoverSlider__img">
                                                <img src={slide.image} alt={`food_${slide.id}`} />
                                            </div>
                                            <div className="discoverSlider__text">
                                                
                                                    <h3
                                                    onClick={()=>{
                                                        scrollToTop()
                                                        navigate(`/${currCountryCode}/discover/${titleCateg}?${slide.category}`)
                                                    }
                                                        }
                                                    >{slide.category}</h3>
                                                
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
