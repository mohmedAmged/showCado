import React, { useEffect, useState } from 'react';
import './userProfileSec.css';
import AccordionFaqSave from '../accordionFaqSave/AccordionFaqSave';
import { useFormik } from 'formik';
import { UpdateProfileSchema } from '../../validation/updateProfileSchema';
import { baseURL, currCountryCode } from '../../functions/BaseURL';
import Loader from '../loader/Loader';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function UserProfileSec({token, userData, countriesData }) {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(true);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowContent(false);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [showContent]);

    const userDataArr = userData?.data?.user;
    console.log(userDataArr)

    const [selectedImage, setSelectedImage] = useState(userDataArr?.image);

    // Handle file change event
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Read the selected image and set it in state
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        };
        values.image = file;
    };

    const [activeTab, setActiveTab] = useState(localStorage.getItem('currDashBoardToggle') || 'coins');

    const [updateUser, setUpdateUser] = useState(false);

    const handleTabClick = (tabId) => setActiveTab(tabId);

    const contactInfo = [
        {
            "id": 1,
            "icon": "bi bi-envelope-fill",
            "title": "email adress",
            "userInfo": `${userDataArr?.email || "Couldn't Found"}`
        },
        {
            "id": 2,
            "icon": "bi bi-telephone-fill",
            "title": "Mobile Number",
            "userInfo": `${userDataArr?.phone || "Couldn't Found"}`
        },
        {
            "id": 3,
            "icon": "bi bi-geo-alt-fill",
            "title": "Address",
            "userInfo": `${userDataArr?.address || "Couldn't Found"}`
        },
    ]

    const selectedCountryObj = countriesData?.find((country) => country?.name === userDataArr?.country);
    const getCities = async (selectedCountry) => {
        const fetchData = await fetch(`${baseURL}/get-cities/${selectedCountry?.code}`);
        const res = await fetchData.json();
        setCurrCountryCities(res?.data?.cities);
    };
    const [currCountryCities, setCurrCountryCities] = useState([]);
    const [currChosenCityId , setCurrChosenCityId] = useState('');
    const [backEndErrors, setBackEndErrors] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(selectedCountryObj);

    const handleCountryChange = (e) => {
        setCurrChosenCityId('');
        const currCountrySelected = countriesData?.find(country => +country?.id === +e.target.value);
        setSelectedCountry(currCountrySelected);
        values.country_id = currCountrySelected?.id;
        getCities(currCountrySelected);
    };

    const handleCityChange = (e) => {
        const selectedCity = currCountryCities?.find(city => +city?.id === +e?.target?.value);
        setCurrChosenCityId(selectedCity?.id);
        values.city_id = selectedCity?.id;
    };

    const onSubmit = async (values, actions) => {
        const isValid = await UpdateProfileSchema.validate(values);
        if(isValid){
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                if (key !== 'image') {
                    formData.append(key, values[key]);
                }
            });
            formData.append('image', values.image);
            const res = await fetch(`${baseURL}/update-profile`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            const response = await res.json();
            if(response.status === 200){
                setBackEndErrors(null);
                actions.resetForm();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${response.message}`,
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(`/${currCountryCode}/user/dashboard`);
                setUpdateUser(false);
            }else {
                setBackEndErrors(response.errors);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! ,Please try again.'
                });

            };
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! ,Please try again.'
            });
        };
    };

    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            first_name: userDataArr?.first_name,
            last_name: userDataArr?.last_name,
            zip_code: userDataArr?.zip_code.toString(),
            email: userDataArr?.email,
            phone: userDataArr?.phone,
            country_id: selectedCountry?.id,
            city_id: userDataArr?.city,
            state: userDataArr?.state,
        },
        validationSchema: UpdateProfileSchema,
        onSubmit,
    });

    return (
        <div className='userProfileSec__handler position-relative'>
            <div className="container">
                <div className="ads__filter__tabs">
                    <div className="row">
                        <div className="col-lg-8">
                            <ul>
                                <li id='coins' className={`mb-2 ads__tab ${activeTab === 'my coins' ? 'active' : ''}`}
                                    onClick={() => {
                                        setShowContent(true);
                                        handleTabClick('my coins');
                                        if(token){
                                            localStorage.setItem('currDashBoardToggle','my coins');
                                        }
                                    }}
                                >
                                    My Coins
                                </li>
                                <li id='dashboard' className={`mb-2 ads__tab ${activeTab === 'my profile' ? 'active' : ''}`}
                                    onClick={() =>{
                                        setShowContent(true);
                                        handleTabClick('my profile');
                                        if(token){
                                            localStorage.setItem('currDashBoardToggle','my profile');
                                        }
                                    }}
                                >
                                    My Profile
                                </li>
                                <li id='wishlist' className={`mb-2 ads__tab ${activeTab === 'my wishlist' ? 'active' : ''}`}
                                    onClick={() =>{
                                        setShowContent(true);
                                        handleTabClick('my wishlist');
                                        if(token){
                                            localStorage.setItem('currDashBoardToggle','my wishlist');
                                        }
                                    }}
                                >
                                    My Wishlist
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {renderSection(activeTab)}
            </div>
        </div>
    );

    function renderSection(tabId) {
        switch (tabId) {
            case 'my coins':
                return (
                    <>
                    {
                        showContent ?
                            <Loader />
                        :
                            <div className="coin__handler" key={tabId}>
                            <h3 className='dash__title'>
                                my coins
                            </h3>
                            <div className="Coin__Sec" >

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="coin__score__card">
                                            <div className="score__number">
                                                {userDataArr?.coins}
                                                <span>coins</span>
                                            </div>
                                            <div className="gain__coins">
                                                <div className="coin__icon">
                                                    <i className="bi bi-coin fs-4"></i>
                                                </div>
                                                <div className="howGain__coin">
                                                    get more coins
                                                    <i className="bi bi-chevron-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className='dash__title'>
                                how to gain coins
                            </h3>
                            <div className="coin__faq">
                                <div className="row">
                                    <div className="col-lg-10">
                                        <AccordionFaqSave />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    </>
                );
            case 'my profile':
                return (
                    <>
                    {
                        showContent ?
                            <Loader />
                        :
                            <div className="dashboardSec__handler" key={tabId}>
                                <div className="row gy-4">
                                    <div className="col-lg-4">
                                        <div className="dashboardSec__left">
                                            <div className="dashboardProfile__image">
                                                <div className={`profile__photo ${userDataArr?.classification ? userDataArr?.classification.toLowerCase() : ''}`}>
                                                    <img src={selectedImage} alt="profile_img" />
                                                    <div className="photo__upload">
                                                        <i className="bi bi-card-image"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dashboardProfile__contact">
                                                <h3 className='dash__title'>{userDataArr?.full_name}</h3>
                                                {
                                                    contactInfo.map((info) => (
                                                        <div className=
                                                            "dashboardProfile__contact__info" key={info?.id}>
                                                            <div className="info__title">
                                                                <i className={info?.icon}></i>
                                                                <span>{info?.title}</span>
                                                            </div>
                                                            <p>{info?.userInfo}</p>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </div>
                <div className="col-lg-8">
                    <div className="profile__update">
                        <h3 className='dash__title'>
                            Profile Details
                        </h3>
                        <div className="user__profile__update">
                            <form onSubmit={handleSubmit} onBlur={handleBlur}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form__item mb-4">
                                            <label htmlFor="" className='label mb-2'>
                                                First Name
                                            </label>
                                            {
                                                updateUser ?
                                                    <>
                                                        <input
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="first_name"
                                                            className={`form-control 
                                                            ${((errors?.first_name && touched.first_name) || backEndErrors?.first_name) ? 'input-error' : '' }
                                                            `}
                                                            value={values?.first_name}
                                                        />
                                                        {((errors?.first_name && touched.first_name) || backEndErrors?.first_name) 
                                                            &&
                                                        <p className='error-text'>{errors?.first_name || backEndErrors?.first_name[0]}</p>}
                                                    </>
                                                    :
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="first_name"
                                                        className='form-control'
                                                        value={values?.first_name}
                                                    />
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form__item mb-4">
                                            <label htmlFor="" className='label mb-2'>
                                                last Name
                                            </label>
                                            {
                                                updateUser ?
                                                    <>
                                                        <input
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="last_name"
                                                            className={`form-control ${((errors?.last_name && touched.last_name) || backEndErrors?.last_name) ? 'input-error' : '' }`}
                                                            value={values?.last_name}
                                                        />
                                                        {((errors?.last_name && touched.last_name) || backEndErrors?.last_name) 
                                                            &&
                                                        <p className='error-text'>{errors?.last_name || backEndErrors?.last_name[0]}</p>}
                                                    </>
                                                    :
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="last_name"
                                                        className='form-control'
                                                        value={values?.last_name}
                                                    />
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form__item mb-4">
                                            <label htmlFor="" className='label mb-2'>
                                                E-mail Address
                                            </label>
                                            {
                                                updateUser ?
                                                    <>
                                                        <input
                                                            onChange={handleChange}
                                                            type="email"
                                                            name="email"
                                                            className={`form-control ${((errors?.email && touched.email) || backEndErrors?.email) ? 'input-error' : '' }`}
                                                            value={values?.email}
                                                        />
                                                        {((errors?.email && touched.email) || backEndErrors?.email) 
                                                            &&
                                                        <p className='error-text'>{errors?.email || backEndErrors?.email[0]}</p>}
                                                    </>
                                                    :
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="email"
                                                        className='form-control'
                                                        value={values?.email}
                                                    />
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form__item mb-4">
                                            <label htmlFor="" className='label mb-2'>
                                                Mobile Number
                                            </label>
                                            {
                                                updateUser ?
                                                    <>
                                                        <input
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="phone"
                                                            className={`form-control ${((errors?.phone && touched.phone) || backEndErrors?.phone) ? 'input-error' : '' }`}
                                                            value={values?.phone}
                                                        />
                                                        {((errors?.phone && touched.phone) || backEndErrors?.phone) 
                                                            &&
                                                        <p className='error-text'>{errors?.phone || backEndErrors?.phone[0]}</p>}
                                                    </>
                                                    :
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="phone"
                                                        className='form-control'
                                                        value={values?.phone}
                                                    />
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form__item mb-4">
                                            <label htmlFor="" className='label mb-2'>
                                                Address
                                            </label>
                                            {
                                                updateUser ?
                                                    <>
                                                        <input
                                                            onChange={handleChange}
                                                            type="text"
                                                            name="state"
                                                            className={`form-control ${((errors?.state && touched.state) || backEndErrors?.state) ? 'input-error' : '' }`}
                                                            value={values?.state}
                                                        />
                                                        {((errors?.state && touched.state) || backEndErrors?.state) 
                                                            &&
                                                        <p className='error-text'>{errors?.state || backEndErrors?.state[0]}</p>}
                                                    </>
                                                    :
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="state"
                                                        className='form-control'
                                                        value={values?.state}
                                                    />
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form__item mb-4">
                                            <label htmlFor="" className='label mb-2'>
                                                Country
                                            </label>
                                            {
                                                updateUser ?
                                                    <>
                                                        <select
                                                            className={`form-select country__select w-100 ${((errors?.country_id && touched?.country_id) || backEndErrors?.country_id) ? 'input-error' : '' }`}
                                                            aria-label="Default select example"
                                                            id='registeration__form__country'
                                                            name='country_id'
                                                            value={selectedCountry?.id}
                                                            onChange={handleCountryChange}
                                                        >
                                                            <option disabled value=''>Select Your Country</option>
                                                            {
                                                                countriesData?.map(country => {
                                                                    return (
                                                                        <option key={country?.id} id={country?.code} value={country?.id}>
                                                                            {country?.name}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                        {((errors?.country_id && touched.country_id) || backEndErrors?.country_id) 
                                                            &&
                                                        <p className='error-text'>{errors?.country_id || backEndErrors?.country_id[0]}</p>}
                                                    </>
                                                    :
                                                    <input
                                                        disabled
                                                        type="text"
                                                        name="country_id"
                                                        className='form-control'
                                                        value={selectedCountryObj?.name}
                                                    />
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form__item">
                                            <label htmlFor="" className='label'>
                                                zip_code
                                            </label>
                                            {
                                                updateUser ?
                                                    <>
                                                        <input
                                                            onChange={handleChange}
                                                            name='zip_code'
                                                            type="text" 
                                                            className={`form-control ${((errors?.zip_code && touched?.zip_code) || backEndErrors?.zip_code) ? 'input-error' : '' }`}
                                                            value={values?.zip_code}
                                                        />
                                                        {((errors?.zip_code && touched?.zip_code) || backEndErrors?.zip_code) 
                                                            &&
                                                        <p className='error-text'>{errors?.zip_code || backEndErrors?.zip_code[0]}</p>}
                                                    </>
                                                    :
                                                    <input
                                                        disabled
                                                        name='zip_code'
                                                        type="text" 
                                                        className='form-control'
                                                        value={values?.zip_code}
                                                    />
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form__item">
                                            <label htmlFor="" className='label'>
                                                city
                                            </label>
                                            {
                                                updateUser ?
                                                <>
                                                    <select
                                                        className={`form-select city__select w-100 
                                                        ${((errors?.city_id && touched.city_id) || backEndErrors?.city_id) ? 'input-error' : '' }`}
                                                        aria-label="Default select example"
                                                        name='city_id'
                                                        value={currChosenCityId}
                                                        onChange={handleCityChange}
                                                    >
                                                        <option disabled value=''>Select Your City</option>
                                                        {
                                                            currCountryCities?.map(city=>{
                                                                return (
                                                                    <option key={city?.id} value={city?.id}>
                                                                        {
                                                                            city?.name
                                                                        }
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    {((errors?.city_id && touched?.city_id) || backEndErrors?.city_id) 
                                                        &&
                                                    <p className='error-text'>{errors?.city_id || backEndErrors?.city_id[0]}</p>}
                                                </>
                                                    :
                                                    <input
                                                        disabled
                                                        name='city_id'
                                                        type="text" className='form-control'
                                                        value={values.city_id}
                                                    />
                                            }
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form__item">
                                            <label htmlFor="">
                                                UpLoad Image
                                            </label>
                                            {
                                                updateUser ?
                                                    <input
                                                    name='image'
                                                    className='form-control'
                                                    type="file" 
                                                    onChange={handleFileChange} 
                                                    accept="image/*" 
                                                    />
                                                :
                                                    <input
                                                    disabled
                                                    name='image'
                                                    className='form-control'
                                                    type="file" 
                                                    accept="image/*" 
                                                    />
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-sm-12">
                                        {
                                            updateUser ?
                                                <button id='dashBoardSubmitBtn' name='dashBoardSubmitBtn' type="submit" className="btn profile__btn__submit w-100">
                                                    Submit
                                                </button>
                                                :
                                                <span onClick=
                                                    {
                                                        () => {
                                                            setUpdateUser(!updateUser);
                                                            getCities(selectedCountryObj);
                                                        }
                                                    }
                                                    className="btn profile__btn__submit w-100 profile__btn__update">
                                                    Update
                                                </span>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                                </div>
                            </div>
                    }
                    </>
                );
            case 'my wishlist':
                return (
                    <>
                    {
                        showContent ?
                            <Loader />
                        :
                            <div className="wishlistSec__handler" key={tabId}>

                            </div>
                    }
                    </>
                );
            default:
                return null;
        };
    };
};
