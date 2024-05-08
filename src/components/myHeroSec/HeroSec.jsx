import React from 'react'
import './heroSec.css'
export default function HeroSec() {
  const svgStyles = {
    strokeDasharray: '241, 243',
    strokeDashoffset: 0,
  };
  return (
    <>
      <div className=''>
        <div className="hero__img__banner d-flex justify-content-start align-items-center">
          <div className="container">
            <div className='hero__text__box '>
              <div className="arrow__box">
                <svg xmlns="http://www.w3.org/2000/svg" width="40.052px" height="155.425px" viewBox="0 0 40.052 155.425">
                  <path fill="none" d="M33.684,2.5c0,0-69.913,59.522-0.374,150.425l-24.749-6.029l24.749,6.029l4.242-22.57" style={svgStyles}></path>
                </svg>
              </div>
              <div className="hero__text">
                <h1>
                  Warranty-Valid
                </h1>
                <h3>
                  cars from verified dellars
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
