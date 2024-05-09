import React from 'react'
import './myFooter.css'
import { NavLink } from 'react-bootstrap'
export default function MyFooter() {
    return (
        <div className='myFooter__handler'>
            <div className="container">
                <div className="myFooter__top">
                    <div className="row justify-content-between">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="myFooter__search">
                                <form action="" className=''>
                                    <input type="text"
                                        placeholder='Enter make or model' />
                                    <button type='submit'>
                                        <i className="bi bi-search"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 myFooter__menu__flex ">
                            <div className="myFooter__menu">
                                <ul>
                                    <li>
                                        <NavLink className='nav-link menu__link'>
                                            Help
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='nav-link menu__link'>
                                            About Us
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='nav-link menu__link'>
                                            Contact Us
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="myFooter__bottom">
                    <div className="row">
                        <div className="col-lg-8 col-sm-8">
                            <div className="copyright__text"> Copyright © 2023. ValuReach – by ValuReach Team
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 myFooter__menu__flex">
                            <div className="copyRights__social">
                                <ul>
                                    <li>
                                        <NavLink className='nav-link copyRigths__icon__link'>
                                        <i className="bi bi-facebook"></i>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='nav-link copyRigths__icon__link'>
                                        <i className="bi bi-twitter"></i>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='nav-link copyRigths__icon__link'>
                                        <i className="bi bi-instagram"></i>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='nav-link copyRigths__icon__link'>
                                        <i className="bi bi-linkedin"></i>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
