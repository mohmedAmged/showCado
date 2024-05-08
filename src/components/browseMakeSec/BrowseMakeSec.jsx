import React from 'react'
import './browseMake.css'
import { NavLink } from 'react-router-dom'
import { currCountryCode } from '../../functions/BaseURL'

export default function BrowseMakeSec({browserItems}) {
  return (
    <div className='browser__make__sec'>
      <div className="container">
        <div className="browser__make__handler">
            <div className="row">
                <div className="col-lg-12">
                    <div className="browser__head">
                        <h1>Browse by <span>make</span></h1>
                    </div>
                </div>
            </div>
            <div className="row">
                {
                    browserItems?.map((item)=>{
                        return( <div key={item?.id} className="col-lg-3 col-md-6 col-sm-6 mb-3 mt-3 d-flex justify-content-center align-items-center">
                                    <div className="browser__box">
                                        <div className="browser__img">
                                            <img src={item?.image} alt="" />
                                        </div>
                                        <div className="browser__text d-flex justify-content-center">
                                            <NavLink className="nav-link" to={`/${currCountryCode}/new-cars?make=${item.id}`}>
                                                <p>
                                                    {item?.name}
                                                </p>
                                            </NavLink>
                                        </div>
                        </div>
                    </div>)
                    })
                }
            </div>
        </div>
      </div>
    </div>
  )
}
