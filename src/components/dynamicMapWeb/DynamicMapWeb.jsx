import React from 'react'
import './dynamicMapWeb.css'
import { scrollToTop } from '../../functions/scrollToTop'
import { NavLink } from 'react-router-dom'
export default function DynamicMapWeb({ title, links }) {
    return (
        <div className='container'>
            <div className='DynamicMapWeb__handler'>
                <h2 className='DynamicMapWeb__handler__title'>{title}</h2>
                <p className='DynamicMapWeb__handler__content'>
                    {links.map((link, index) => (
                        <React.Fragment key={index}>
                            <NavLink onClick={() => scrollToTop()} to={link.route} className="nav-link content__link d-inline">
                                {link.label}
                            </NavLink>
                            {index < links.length - 1 && <span className="mx-2"><i className="bi bi-arrow-right"></i>
                            </span>}
                        </React.Fragment>
                    ))}
                </p>
            </div>
        </div>
    )
}
