import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./shopSec.css";
import { InputGroup } from "react-bootstrap";
import ProductCard from "../productCard/ProductCard";
import ListCardItems from "../listCardItems/ListCardItems";
import ReactSlider from "react-slider";
import { baseURL, currCountryCode } from '../../functions/BaseURL';
import { useNavigate, useLocation } from "react-router-dom";
import { scrollToTop } from '../../functions/scrollToTop';

export default function ShopSec({ cars, makes, bodies, priceQuery }) {
    const navigate = useNavigate();
    const { pathname ,search } = useLocation();
    const getCurrentLocationData = (arr) => {
        let myObj = {}
        const searchArr = [...arr];
        const withoutQuestionMark = searchArr.slice(1, (searchArr.length));
        const searchArrWithoutAnyThing = withoutQuestionMark.join("").split("&")
        searchArrWithoutAnyThing.forEach((e) => {
            const elementArray = e.split("=");
            myObj = ({
                ...myObj,
                [elementArray[0]]: elementArray[1]
            });
        })
        return myObj;
    }

    const [activeView, setActiveView] = useState('grid');
    const [currentCars, setCurrentCars] = useState(cars);
    const [filters, setFilters] = useState({});

    const uniqueTransmissons = [...new Set(cars?.map(car => car.transmission))];
    const uniqueConditions = [...new Set(cars?.map(car => car.condition))];

    const minPrice = Number(priceQuery.data?.min);
    const maxPrice = Number(priceQuery.data?.max) + 1000;
    const [values, setValues] = useState([minPrice, maxPrice]);

    const handleSliderChange = (newValues) => {
        setValues(newValues);
        setFilters((prevFilters) => ({
            ...prevFilters,
            price_from: newValues[0],
            price_to: newValues[1],
        }));
        const filterParams = new URLSearchParams(filters);
        navigate(`/${currCountryCode}/new-cars?${filterParams.toString()}`);
    };

    const handleIconClick = (view) => {
        setActiveView(view);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
        const filterParams = new URLSearchParams(filters);
        navigate(`/${currCountryCode}/new-cars?${filterParams.toString()}`);
    };

    useEffect(() => {
        if (search) {

            const ourDaraSearchObj = getCurrentLocationData(search);
            (async () => {
                const searchParams = new URLSearchParams(ourDaraSearchObj);
                const fetchSearchedDataUrl = `${baseURL}/${currCountryCode}/cars-search?${searchParams.toString()}`;
                const fetchData = await fetch(fetchSearchedDataUrl);
                const response = await fetchData.json();
                setCurrentCars(response.data.cars);
            })();
        }

        if (filters.condition
            || filters.make
            || filters.body
            || filters.transmission
            || filters.price_from
            || filters.price_to) {
            const filterParams = new URLSearchParams(filters);
            navigate(`/${currCountryCode}/new-cars?${filterParams.toString()}`);
        }
    }, [search, filters, navigate]);

    const handleResetButtonClick = () => {
        setFilters({});
        setValues([minPrice, maxPrice]);
        navigate(`/${currCountryCode}/new-cars`);
        window.location.reload();
    };

    return (
        <div className="shopSec__handler">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 mb-5">
                        <div className="search__part__handler">
                            <div className="search__title">Advanced search</div>
                            <div className="search__form__handler">
                                <form action="">
                                    <div className="select__item">
                                        <Form.Select
                                            defaultValue="condition"
                                            onChange={(e) => {
                                                handleFilterChange('condition', e.target.value.toLowerCase());
                                            }}
                                        >
                                            <option value="condition" disabled>Condition</option>
                                            {uniqueConditions?.map(condition => (
                                                <option key={condition} value={condition}>
                                                    {condition}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                    <div className="select__item">
                                        <Form.Select defaultValue="make" onChange={(e) => handleFilterChange('make', e.target.value.toLowerCase())}>
                                            <option value="make" disabled>Make</option>
                                            {
                                                makes?.map((make) => (
                                                    <option key={make.id} value={make?.id}>{make.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </div>
                                    <div className="select__item">
                                        <Form.Select defaultValue="body" onChange={(e) => handleFilterChange('body', e.target.value.toLowerCase())}>
                                            <option value="body" disabled>body</option>
                                            {
                                                bodies?.map((body) => (
                                                    <option key={body.id} value={body?.id}>
                                                        {body.name}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </div>
                                    <div className="select__item">
                                        <Form.Select defaultValue="transmission" onChange={(e) => handleFilterChange('transmission', e.target.value.toLowerCase())}>
                                            <option disabled value="transmission">transmission</option>
                                            {uniqueTransmissons.map(transmission => (
                                                <option key={transmission} value={transmission}>
                                                    {transmission}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>
                                    <div className="form__actions d-flex justify-content-end align-items-center">
                                        <button type="reset" className="form__reset__btn"
                                            // onClick={()=>{
                                            //     setCurrentCars(cars);
                                            //     navigate("/new-cars")
                                            // }}
                                            // onClick={handleResetButtonClick}
                                            onClick={() => {
                                                handleResetButtonClick();
                                                scrollToTop();
                                            }}
                                        >
                                            <i className="bi bi-arrow-counterclockwise fs-5"></i>
                                            reset
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="price__search__part">
                            <div className="price__search__title">
                                Select Price
                            </div>
                            <div className="price__Sec">
                                <div className="range__item">
                                    <ReactSlider
                                        className="range-slider"
                                        value={values}
                                        withBars
                                        min={minPrice}
                                        max={maxPrice}
                                        step={500}
                                        pearling
                                        onChange={handleSliderChange}
                                    />
                                </div>
                                <div className="input__price">
                                    <div className="row">

                                        <div className="col-lg-6">
                                            <div className="input__item">
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        placeholder="min price"
                                                        aria-label="min price"
                                                        value={`${values[0]}$`}
                                                        aria-describedby="basic-addon1"
                                                        onChange={(e) => {
                                                            handleFilterChange("price_from", e.target.value)
                                                        }}
                                                    />
                                                </InputGroup>
                                            </div>

                                        </div>
                                        <div className="col-lg-6">
                                            <div className="input__item">
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        placeholder="max price"
                                                        aria-label="max price"
                                                        value={`${values[1]}$`}
                                                        aria-describedby="basic-addon1"
                                                        onChange={(e) => {
                                                            handleFilterChange("price_to", e.target.value)
                                                        }}
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="shop__part">
                            <div className="shop__part__main__tit d-flex justify-content-between">
                                <h3>
                                    cars for sale
                                </h3>
                                <div className="filter__icons d-flex align-items-center">
                                    <div className={`icon__box grid__icon fs-5 
                                    ${activeView === 'grid' ? 'active' : ''}`}
                                        onClick={() => handleIconClick('grid')}
                                    >
                                        <i className="bi bi-grid"></i>
                                    </div>
                                    <div className={`icon__box list__icon fs-5 
                                    ${activeView === 'list' ? 'active' : ''}`}
                                        onClick={() => handleIconClick('list')}
                                    >
                                        <i className="bi bi-list-ul fs-5"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="shop__list">
                                <div className="shop__list__heading">
                                    <div className="heading__text">
                                        Featured Classified
                                    </div>
                                </div>
                                <div
                                    className={`shop__grid__items ${activeView === 'grid' ? 'active' : ''}`}
                                >
                                    <div className="row mb-4">
                                        {
                                            currentCars?.map(car => {
                                                return (
                                                    <ProductCard key={car?.id} carInfo={car} />
                                                )
                                                
                                            })
                                            
                                        }
                                    </div>
                                </div>
                                <div
                                    className={`shop__list__items ${activeView === 'list' ? 'active' : ''}`}
                                >
                                    <div className="row mb-4">
                                        {
                                            currentCars?.map(car => {
                                                return (
                                                    <ListCardItems key={car?.id} carInfo={car} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
