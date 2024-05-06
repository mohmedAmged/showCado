import React from 'react'
import './dynamicHero.css'
export default function DynamicHero({ title, description}) {
    return (
        <div className='dynamic__hero__handler'>
            {/* <div className="overlay"></div> */}
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
                                        <div className="dicover__form__location col-lg-3 col-md-12 col-sm-12 px-1">
                                            <select defaultValue='' className='discover__form__item' name="" id="">
                                                <option value='' disabled>Country</option>
                                                <option value="egypt">egypt</option>
                                                <option value="egypt">egypt</option>
                                                <option value="egypt">egypt</option>
                                                <option value="egypt">egypt</option>
                                            </select>
                                        </div>
                                        <div className="dicover__form__category col-lg-3 col-md-12 col-sm-12 px-1">
                                            <select defaultValue='' className='discover__form__item' name="" id="">
                                                <option value='' disabled>Category</option>
                                                <option value="egypt">one</option>
                                                <option value="egypt">two</option>
                                                <option value="egypt">three</option>
                                            </select>
                                        </div>
                                        <div className="dicover__form__sub__category col-lg-3 col-md-12 col-sm-12 px-1">
                                            <select defaultValue='' className='discover__form__item' name="" id="">
                                                <option value='' disabled>Sub-Category</option>
                                                <option value="egypt">one</option>
                                                <option value="egypt">two</option>
                                                <option value="egypt">three</option>
                                            </select>
                                        </div>
                                        <div className="discover__form__btn col-lg-3 col-md-12 col-sm-12 px-1">
                                            <button className='discover__form__item' type="submit" name="search" value="Search">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
