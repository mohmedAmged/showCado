import React, { useState } from 'react'
import './discoverAdsFilter.css'
import AdsCard from '../adsCard/AdsCard'
export default function DiscoverAdsFilter({ discoversFetched }) {
    const [activeTab, setActiveTab] = useState('latest');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const categoryNames = discoversFetched?.discoverCategories?.map((category) => category?.name);
    const filteredDiscoverData = () => {
        if (activeTab === 'latest') {
            return discoversFetched?.discoverCategories?.flatMap(category => category.discovers) || [];
        } else {
            // return discoversFetched?.discoverCategories?.filter((data) => data?.name?.toLowerCase() === activeTab?.toLowerCase());
            const selectedCategory = discoversFetched?.discoverCategories?.find(category => category.name.toLowerCase() === activeTab.toLowerCase());
            return selectedCategory?.discovers || [];
        }
    };

    // const getDiscoversByCategory = (categoryName) => {
    //     return discoversFetched?.discoverCategories?.find((category) => category?.name?.toLowerCase() === categoryName?.toLowerCase())?.discovers || [];
    // };
    return (

        <div className='discoverAdsFilter__handler my-5'>
            <div className="container">
                <div className="ads__filter__heading">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h3>Advertisements</h3>
                            <p>An advertisement section where you can find your best destination for whatever you want.</p>
                        </div>
                    </div>
                </div>
                <div className="ads__filter__tabs">
                    <div className="row">
                        <div className="col-lg-8">
                            <ul>
                                <li
                                    key='latest'
                                    className={`ads__tab ${activeTab === 'latest' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('latest')}
                                >
                                    Latest
                                </li>
                                {categoryNames?.slice(0,3)?.map((categoryName) => (
                                    <li
                                        key={categoryName}
                                        className={`ads__tab ${activeTab === categoryName?.toLowerCase() ? 'active' : ''}`}
                                        onClick={() => handleTabClick(categoryName?.toLowerCase())}
                                    >
                                        {categoryName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="ads__filter__cards">
                    <div className="row">
                        {filteredDiscoverData()?.map((discoverData, index) => (
                            <AdsCard key={index} discoverData={discoverData} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

//     <div className="container">
//         <div className="ads__filter__heading">
//             <div className="row justify-content-center">
//                 <div className="col-lg-8 text-center">
//                     <h3>
//                         Advertisements
//                     </h3>
//                     <p>
//                         An advertisement section where can fin your best destination to what ever you want.
//                     </p>
//                 </div>
//             </div>
//         </div>
//         <div className="ads__filter__tabs">
//             <div className="row">
//                 <div className="col-lg-8">
//                     <ul >
//                         <li id='latest' className={`ads__tab ${activeTab === 'latest' ? 'active' : ''}`}
//                             onClick={() => handleTabClick('latest')}
//                         >
//                             Latest
//                         </li>
//                         <li id='food' className={`ads__tab ${activeTab === 'food' ? 'active' : ''}`}
//                             onClick={() => handleTabClick('food')}
//                         >
//                             Food
//                         </li>
//                         <li id='health' className={`ads__tab ${activeTab === 'health' ? 'active' : ''}`}
//                             onClick={() => handleTabClick('health')}
//                         >
//                             Health
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         <div className="ads__filter__cards">
//             <div className="row">
//                 {
//                     filteredRestaurantData().map((restaurantData, index) => {
//                         return (
//                             <AdsCard key={index} restaurantData={restaurantData} />
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     </div>
// </div>

// const [activeTab, setActiveTab] = useState('latest');

// const handleTabClick = (tabId) => {
//     setActiveTab(tabId);
// };

// const filteredRestaurantData = () => {
//     if (activeTab === 'latest') {
//         return restaurantDataArr;
//     } else {
//         return restaurantDataArr.filter((data) => data.category.toLowerCase() === activeTab.toLowerCase());
//     }
// };