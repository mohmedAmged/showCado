import React, { useState } from 'react';

export default function CartTop({carTopInfo}) {
    const [activeIndicator, setActiveIndicator] = useState(0);

    const handleIndicatorHover = (index) => {
        setActiveIndicator(index);
    };

    const getImageSource = () => {
        return carTopInfo?.carImages[activeIndicator].image;
    };
    return (
        <div className="cart__top">
            <div className="img__Cart">
                <img id="carImage" src={getImageSource()} alt="car__image" />
            </div>
            <div className={`cart__badge ${carTopInfo.ad_state === 'sold' ? 'soldBadge' : (carTopInfo.ad_state === 'sponsered' ? 'sponsoredBadge' : '')}`}>
                {carTopInfo.ad_state}
            </div>
            <div className="cart__camera">
                <div className="cart__Camera__content">
                    <i className="bi bi-camera-fill"></i>
                    <span>{carTopInfo?.carImagesCount}</span>
                </div>
            </div>
            <div className="cart__indicator">
                {carTopInfo?.carImages.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === activeIndicator ? 'active' : ''}`}
                        onMouseOver={() => handleIndicatorHover(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};
