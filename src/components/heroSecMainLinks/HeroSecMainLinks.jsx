import React from 'react'
import './heroSecMainLinks.css'
export default function HeroSecMainLinks({heroItems}) {
    
  return (
    <>
    <div className='heroSecMainLinks__handler'>
        <div className="hero__img__banner d-flex justify-content-start align-items-center" style={{ backgroundImage: `url(${heroItems[0].image})` }}>
        <div className="overlay"></div>
            <div className="container">
                <div className='hero__text__box '>
                    <div className="hero__text">
                        <h1 className='mb-4'>
                        {heroItems[0].title}
                        </h1>
                        <h3>
                        {heroItems[0].subTit}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

