/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from 'react'
import './myNav.css'
import { Container, Nav, Navbar } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../functions/scrollToTop';
import logo2 from '../../assets/logo/weblogo4.png'
import { currCountryCode } from '../../functions/BaseURL';

export default function MyNav({ scrollToggle, countriesData, token, handleLogout }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    useEffect(() => {
        if (!currCountryCode) {
            navigate("/")
        }
    }, [currCountryCode, navigate])


    function handleOffcanvasToggle() {
        setShowOffcanvas((prevShowOffcanvas) => !prevShowOffcanvas);
    }

    const closeOffcanvas = () => {
        setShowOffcanvas(false);
    };


    const handleSelectChange = (e) => {
        localStorage.setItem('curr-country', e.target.value);
        navigate(`/${e.target.value}`);
        window.location.reload()

    };
    return (
        <div>
            <Navbar expand="lg" className={`nav__Bg ${scrollToggle ? "nav__fixed py-3 navTransformationDown" : "nav__absolute pb-3"} align-items-center`}>
                <Container>
                    <Navbar.Brand className='d-flex align-items-center'>
                        {/* <NavLink to={`/${currCountryCode}`}>
                            <img className='logo__Width' src={logo2} alt="main__logo" />
                        </NavLink> */}
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={handleOffcanvasToggle} aria-controls="basic-navbar-nav" />
                    {/* start navbar min-width 992px */}
                    <Navbar.Collapse id="navbar-nav" className='Navbar__Collapse__none__on__med'>
                        <Nav className="mx-auto" >
                            {
                                token &&  
                                <NavLink
                                    onClick={() => {
                                        scrollToTop();
                                    }}
                                    aria-label="Close"
                                    className={`nav-link nav__link__style ${!token && 'nav__link__style__tok'}`}
                                    to={`${currCountryCode}/user/dashboard`}>
                                    profile
                                </NavLink>
                            }
                            <NavLink
                                onClick={() => {
                                    scrollToTop();
                                }}
                                aria-label="Close"
                                className={`nav-link nav__link__style ${!token && 'nav__link__style__tok'}`}
                                to={`/${currCountryCode}/cars`}
                            >
                                cars
                            </NavLink>
                            {/* <NavLink
                                onClick={() => {
                                    scrollToTop();
                                }

                                }
                                className={`nav-link nav__link__style ${!token && 'nav__link__style__tok'}`}
                                to={`/${currCountryCode}/discover`}>
                                Discover
                            </NavLink> */}
                            {/* <NavLink
                                onClick={() => {
                                    scrollToTop();
                                }
                                }
                                className={`nav-link nav__link__style ${!token && 'nav__link__style__tok'}`}
                                to={`/${currCountryCode}/save`}>
                                Save
                            </NavLink> */}
                            <NavLink
                                onClick={() => {
                                    scrollToTop();
                                }
                                }
                                className={`nav-link nav__link__style ${!token && 'nav__link__style__tok'}`}
                                to={`/${currCountryCode}/realestate`}>
                                Real Estate
                            </NavLink>
                            <NavLink
                                onClick={() => {
                                    scrollToTop();
                                }
                                }
                                className={`nav-link nav__link__style ${!token && 'nav__link__style__tok'}`}
                                to={`/${currCountryCode}/electronics`}>
                                Electronics
                            </NavLink>
                            <NavLink
                                onClick={() => {
                                    scrollToTop();
                                }
                                }
                                className={`nav-link nav__link__style ${!token && 'nav__link__style__tok'}`}
                                to={`/${currCountryCode}/mobiles`}>
                                Mobiles
                            </NavLink>
                            {/* <NavLink
                                onClick={() => {
                                    scrollToTop();
                                }}
                                className={`nav-link nav__link__style ${!token && 'nav__link__style__tok'}`}
                                to={`/${currCountryCode}/realestate`}>
                                Real Estate
                            </NavLink> */}
                        </Nav>
                        <Nav>
                            <NavLink onClick={() => {
                                scrollToTop();
                                if (token) {
                                    handleLogout();
                                };
                            }}
                                className="nav-link nav__link__style"
                                to={token ? `${location?.pathname}` : `/${currCountryCode}/register`}>
                                {
                                    token ? (
                                        <div className='btn__Car btn__Car__logOut d-flex justify-content-center align-items-center'>
                                            <i className="bi bi-box-arrow-left fs-6"></i>
                                            <span>
                                                Log Out
                                            </span>
                                        </div>
                                    ) : (
                                        <div className='btn__Car d-flex justify-content-center align-items-center'>
                                            <i className="bi bi-person-add fs-6"></i>
                                            <span>
                                                Sign up
                                            </span>
                                        </div>
                                    )
                                }
                            </NavLink>
                            <NavLink
                                className="nav-link nav__link__style"
                            >
                                <div className="custom-dropdown">
                                    <select className='select__country__style'
                                        onChange={handleSelectChange}
                                        value={currCountryCode || ''}

                                    >
                                        <option disabled>Select Country</option>
                                        {
                                            countriesData?.map((country) => (
                                                <option className='select__country__option__style'
                                                    key={country?.id}
                                                    value={country?.code}
                                                    title={country?.name}
                                                >
                                                    {country?.code}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    {/* end navbar min-width 992px */}
                    {/* start navbar min-width 320px */}
                    <Navbar.Offcanvas
                        id="offcanvasNavbar" className='Navbar__offCanvas__none__on__lg' aria-labelledby="offcanvasNavbarLabel"
                        show={showOffcanvas}
                        onHide={handleOffcanvasToggle}
                        placement="start">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className='offCanvas__head' id="offcanvasNavbarLabel">
                                <NavLink to={`/${currCountryCode}`} className="px-4">
                                    <img className='logo__Width' src={logo2} alt="logo__canvas" />
                                </NavLink>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="mx-auto" >
                                {
                                    token && 
                                    <NavLink
                                    onClick={() => {
                                        scrollToTop();
                                        closeOffcanvas();
                                    }}
                                    aria-label="Close"
                                    className={`nav-link nav__link__style`}
                                    to={`/${currCountryCode}/user/dashboard`}>
                                    profile
                                    </NavLink>
                                }
                                
                                <NavLink
                                    onClick={() => {
                                        scrollToTop();
                                        closeOffcanvas();
                                    }}
                                    aria-label="Close"
                                    className={`nav-link nav__link__style`}
                                    to={`/${currCountryCode}/cars`}>
                                    cars
                                </NavLink>
                                <NavLink
                                    onClick={() => {
                                        scrollToTop();
                                        closeOffcanvas();
                                    }
                                    }
                                    className={`nav-link nav__link__style`}
                                    to={`/${currCountryCode}/realestate`}
                                >
                                    Real Estate
                                </NavLink>
                                <NavLink
                                    onClick={() => {
                                        scrollToTop();
                                        closeOffcanvas();
                                    }
                                    }
                                    className={`nav-link nav__link__style`}
                                    to={`/${currCountryCode}/electronics`}>
                                    Electronics
                                </NavLink>
                                <NavLink
                                    onClick={() => {
                                        scrollToTop();
                                        closeOffcanvas();
                                    }
                                    }
                                    className={`nav-link nav__link__style`}
                                    to={`/${currCountryCode}/mobiles`}>
                                    Mobiles
                                </NavLink>
                                
                                <NavLink onClick={() => {
                                    scrollToTop();
                                    closeOffcanvas();
                                    if (token) {
                                        handleLogout();
                                    }
                                }}
                                    className="nav-link nav__link__style"
                                    to={token ? `${location?.pathname}` : `/${currCountryCode}/register`}>
                                    {
                                    token ? (
                                        <div className='btn__Car btn__Car__logOut d-flex justify-content-center align-items-center'>
                                            <i className="bi bi-box-arrow-left fs-6"></i>
                                            <span>
                                                Log Out
                                            </span>
                                        </div>
                                    ) : (
                                        <div className='btn__Car d-flex justify-content-center align-items-center'>
                                            <i className="bi bi-person-add fs-6"></i>
                                            <span>
                                                Sign up
                                            </span>
                                        </div>
                                    )
                                }
                                </NavLink>
                                <NavLink onClick={() => {
                                    scrollToTop();
                                }}
                                    className="nav-link nav__link__style"
                                >
                                    <div className="custom-dropdown">
                                        <select className='select__country__style'
                                            onChange={handleSelectChange}
                                            value={currCountryCode || ''}
                                        >
                                            <option disabled>Select Country</option>
                                            {
                                                countriesData?.map((country) => (
                                                    <option className='select__country__option__style'

                                                        key={country?.id}
                                                        value={country?.code}
                                                        title={country?.name}
                                                    >
                                                        {country?.code}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {/* <div className="flag-preview">
                                        {selectedCountry && (
                                            <img
                                                src={
                                                    countriesData?.map((country)=>(
                                                        country?.flag
                                                    ))
                                                }
                                                alt="Selected Flag"
                                            />
                                        )}
                                    </div> */}
                                    </div>
                                </NavLink>
                            </Nav>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    {/* end navbar min-width 320px */}
                </Container>
            </Navbar>
        </div>
    )
}
