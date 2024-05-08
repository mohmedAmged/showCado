import React, { useEffect, useState } from 'react'
import './discoverNameSec.css'
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL, currCountryCode } from '../../functions/BaseURL';
import { useQuery } from '@tanstack/react-query';
import VoteModal from '../voteModal/VoteModal';
import RecommendUsModal from '../recommendUsModal/RecommendUsModal';
export default function DiscoverNameSec({ discoverHome, token }) {
    const { discoverName } = useParams();
    const discoversFetched = discoverHome?.all_discovers?.find((el) => el.name === discoverName)
    const sub_categ_ID = discoversFetched?.sub_category_id
    const discoverSubCateg = useQuery({
        queryKey: ['discover-sub'],
        queryFn: async () => {
            const fetchData = await fetch(`${baseURL}/${currCountryCode}/discover-sub-categories/${sub_categ_ID}`);
            const response = await fetchData.json();
            return response.data;
        },
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showRecommend, setShowRecommend] = useState(false);
    const handleCloseRecommend = () => setShowRecommend(false);
    const handleShowRecommend = () => setShowRecommend(true);

    const discoverSubCategName = discoverSubCateg?.data?.name
    const discoversSubCategData = discoverSubCateg?.data?.discovers;

    const navigate = useNavigate();
    return (
        <div className='discoverNameSec__handler'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="discover__item__handler">
                            <div className="discover__img">
                                <img src={discoversFetched?.image} alt={discoversFetched?.name} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="discover__title__name">
                            <h2 className='title'>
                                <span>{discoversFetched?.name}</span> delivers to you
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio est assumenda voluptatem veritatis earum, aut maiores numquam in repellendus sit!
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="discover__best__sell">
                            <h2 className='title'>
                                best seller
                            </h2>
                            <div className="row ">
                                {
                                    discoversFetched?.images?.map((el) => (
                                        <div className="col-lg-4 col-md-6 d-flex ">
                                            <div key={el?.id} className="best__sell__item">
                                                <img src={el?.img} alt={el?.id} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="voteAndRecommendHandler">
                            <div className="row align-items-center">
                                <div className="col-lg-2 vote__number__handler position-relative">
                                    <div className={`vote__number`}>
                                        <i class="bi bi-star-fill position-relative ">
                                            <span className='number__inside__star'>
                                                {discoversFetched?.votes}
                                            </span>
                                        </i>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex justify-content-lg-start">
                                    <div className="review__handler">
                                        <h2 className='title'>
                                            voted for<span> {discoversFetched?.name}</span>
                                        </h2>
                                        <div class="vote__text__reminder">
                                            <i class="bi bi-patch-exclamation"></i>
                                            <span>
                                                give your vote for two more to get your coins for more future discount
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 marginTopInResponsive">
                                    {
                                        token ?
                                            <>
                                                <div className='give__review'
                                                    onClick={handleShow}>
                                                    <span className='vote__icon'>
                                                        <i class="bi bi-hand-thumbs-up"></i>
                                                    </span>
                                                    give your vote

                                                </div>
                                                <>
                                                    <VoteModal sub_categ_ID={sub_categ_ID} token={token} show={show} setShow={setShow} handleClose={handleClose} discoversSubCategData={discoversSubCategData} discoverSubCategName={discoverSubCategName} />
                                                </>
                                                <div className='give__review recomend'
                                                    onClick={handleShowRecommend}>
                                                    <span className='vote__icon recomend'>
                                                        <i class="bi bi-bookmark-plus"></i>
                                                    </span>
                                                    recommend {discoversFetched?.sub_category_name} places

                                                </div>
                                                <>
                                                    <RecommendUsModal
                                                        token={token}
                                                        showRecommend={showRecommend} handleCloseRecommend={handleCloseRecommend} discoversSubCategData={discoversSubCategData} discoverSubCategName={discoverSubCategName} />
                                                </>
                                            </> :
                                            <>
                                                <div className="remider__for__signUp__handler"
                                                    onClick={() => navigate(`/${currCountryCode}/register`)}>
                                                    <div className="remider__for__signUp__icon">
                                                        <i className="bi bi-exclamation-triangle-fill fs-1"></i>
                                                    </div>
                                                    <p className='d-flex align-items-center justify-content-center'>
                                                        sign up for voting to get more coins for future discount
                                                    </p>
                                                </div>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
