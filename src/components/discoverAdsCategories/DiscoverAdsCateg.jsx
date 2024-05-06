import React from 'react'
import './discoverAdsCateg.css'
import CategoryCard from '../categoryCard/CategoryCard'
export default function DiscoverAdsCateg({adsFetched}) {
  return (
    <div className='discover__Ads__categories__handler mt-5'>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h3>
            Ads Categories
            </h3>
            <p>
            Semper ac dolor vitae accumsan. Cras interdum hendrerit lacinia.
            </p>
          </div>
        </div>
        <div className="row">
          {
          adsFetched?.map((el)=>{
          return(
          <CategoryCard  key={el?.id} category={el.name}
          imgSrc={el.image}
          adsCount={el.discoversCount}
          subcategories={el.subCategories}
          iconclassName={el.icon}/>
          )
            })
          }
        </div>
      </div>
    </div>
  )
}
