import React, { useState } from 'react'
import './homeMainHero.css'
const categoryOptions = [
    { value: 'Saving on pizza', label: 'Saving on pizza' },
    { value: 'Buying a hybrid car', label: 'Buying a hybrid car' },
    { value: 'Moving to a new home', label: 'Moving to a new home' },
    { value: 'Finding a good cinema', label: 'Finding a good cinema' },
    { value: 'Locating an iPhone shop', label: 'Locating an iPhone shop' },
];
export default function HomeMainHero({ title, description }) {
    const [mainCategory, setMainCategory] = useState('');

    const handleMainCategoryChange = (event) => {
        setMainCategory(event.target.value);
    };

    return (
        <div className='homeMainHero__handler'>
            <div className='dynamic__hero__handler'>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-sm-12 col-md-12 d-flex justify-content-center align-items-center">
                            <div className="discover__hero__box">
                                <div className="discover__hero__text">
                                    <h1>
                                        {title}
                                    </h1>
                                    <p>
                                        {description}
                                    </p>

                                </div>
                                <div className="discover__hero__form position-relative">
                                    <form action="">
                                        <div className="discover__form row">
                                            <div className="dicover__form__category col-lg-10 col-md-12 col-sm-12 px-1">
                                                <select
                                                    className='discover__form__item round'
                                                    name="mainCategory"
                                                    id="main-category"
                                                    value={mainCategory}
                                                    onChange={handleMainCategoryChange}
                                                >
                                                    <option value="" disabled>I Want To ...</option>
                                                    {categoryOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>I Want To {option.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="discover__form__btn col-lg-2 col-md-12 col-sm-12 px-1">
                                                <button className='discover__form__item' type="submit" name="search" value="Search">Go</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
