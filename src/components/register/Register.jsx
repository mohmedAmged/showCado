import React, { useEffect, useState } from 'react'
import './register.css'
import { useFormik } from 'formik';
import { RegisterSchema } from '../../validation/RegisterSchema';
import { scrollToTop } from '../../functions/scrollToTop';
import { NavLink, useNavigate } from 'react-router-dom';
import { baseURL, currCountryCode } from '../../functions/BaseURL';
import Swal from 'sweetalert2';
import Loader from '../loader/Loader';

export default function Register({handleLoginOrRegister,countriesData}) {
    const [showContent, setShowContent] = useState(true);
    const [showPassword,setShowPassword] = useState(true);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowContent(false);
        }, 800);
        return () => clearTimeout(timeoutId);
    });

    const navigate = useNavigate();
    const [currCountryCities, setCurrCountryCities] = useState([]);
    const [currChosenCity , setCurrChosenCity] = useState('')
    const [backEndErrors, setBackEndErrors] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');

    const onSubmit = async (values, actions) => {
        const isValid = await RegisterSchema.validate(values);
        if(isValid){
            const res = await fetch(`${baseURL}/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(values)
            });
            const response = await res.json();
            if(response?.status === 200){
                setBackEndErrors(null);
                setCurrChosenCity('');
                setCurrCountryCities([]);
                setSelectedCountry('');
                actions.resetForm();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${response.message}`,
                    showConfirmButton: false,
                    timer: 2000
                });
                handleLoginOrRegister(response?.data?.token);
                navigate(`/${currCountryCode}/user/dashboard`)
            }else {
                setBackEndErrors(response.errors);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });

            }
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        }
    };

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setCurrChosenCity('');
        const currCountrySelected = countriesData?.find(country => country?.code === e.target.value);
        values.country_id = currCountrySelected?.id;
        (async () => {
            const fetchData = await fetch(`${baseURL}/get-cities/${currCountrySelected.code}`);
            const res = await fetchData.json();
            setCurrCountryCities(res?.data?.cities);
        })();
    };

    const handleCityChange = (e) => {
        const selectedCity = currCountryCities?.find(city => city?.name === e?.target?.value);
        setCurrChosenCity(selectedCity.name);
        values.city_id = selectedCity?.id;
    }

    const { values, touched , errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            // zip_code: "",
            email: "",
            phone: "",
            password: "",
            country_id: "",
            city_id: "",
            state: "",
        },
        validationSchema: RegisterSchema,
        onSubmit,
    });

    return (
        <>
        {
            showContent ? 
                <Loader /> 
            : 
            <div className='registerAndLogin__handler'>
                <div className="icon__routeBackToHome position-absolute" onClick={() => {
                    (async () => {
                        await navigate(`/${currCountryCode}`);
                        window.scrollTo({
                            top: 210,
                        });
                    })()
                }}>
                    <i className="bi bi-box-arrow-left fs-1"></i>
                </div>
                <div className="container position-relative">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 registeration__form mx-auto">
                            <h2 className='text-center'>register</h2>
                            <form
                                action="Post"
                                className='px-5 pt-3 row m-0 gapY-3'
                                onSubmit={handleSubmit}
                                onBlur={handleBlur}
                            >

                                <div 
                                className={`${((errors?.first_name && touched.first_name) || backEndErrors?.first_name) ? "mb-2" : "mb-3"}
                                col-md-6 mb-4`}>
                                    <input
                                        value={values?.first_name}
                                        onChange={handleChange}
                                        type="text"
                                        id='first_name'
                                        name='first_name'
                                        placeholder='First Name'
                                        className={`first_name__input w-100 
                                        ${((errors?.first_name && touched.first_name) || backEndErrors?.first_name) ? 'input-error' : '' }`}
                                    />
                                    {((errors?.first_name && touched.first_name) || backEndErrors?.first_name) 
                                    && 
                                    <p className='error-text'>{errors?.first_name || backEndErrors?.first_name[0]}</p>}
                                </div>

                                <div 
                                className={`${((errors?.last_name && touched?.last_name) || backEndErrors?.last_name) ? "mb-2" : "mb-3"} 
                                col-md-6 mb-4`}>
                                    <input
                                        value={values?.last_name}
                                        onChange={handleChange}
                                        type="text"
                                        id='last_name'
                                        name='last_name'
                                        placeholder='Last Name'
                                        className={`last_name__input w-100 
                                        ${((errors?.last_name && touched?.last_name) || backEndErrors?.last_name) ? 'input-error' : '' }`}
                                    />
                                    {((errors?.last_name && touched?.last_name) || backEndErrors?.last_name) 
                                    && 
                                    <p className='error-text'>{errors?.last_name || backEndErrors?.last_name[0]}</p>}
                                </div>

                                <div 
                                className={`${((errors?.country_id && touched.country_id) || backEndErrors?.country_id) ? "mb-2" : "mb-3"} 
                                col-md-6 mb-4`}>
                                    <select
                                        className={`form-select country__select w-100 
                                        ${((errors?.country_id && touched.country_id) || backEndErrors?.country_id) ? 'input-error' : '' }`}
                                        aria-label="Default select example"
                                        id='registeration__form__country'
                                        name='country'
                                        value={selectedCountry}
                                        onChange={handleCountryChange}
                                    >
                                        <option disabled value=''>Select Your Country</option>
                                        {
                                            countriesData?.map(country=>{
                                                return (
                                                    <option key={country?.id} id={country?.code} value={country.code}>
                                                        {country?.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    {((errors?.country_id && touched.country_id) || backEndErrors?.country_id) 
                                    && 
                                    <p className='error-text'>{errors?.country_id || backEndErrors?.country_id[0]}</p>}
                                </div>

                                <div 
                                className={`${((errors?.city_id && touched.city_id) || backEndErrors?.city_id) ? "mb-2" : "mb-3"} 
                                col-md-6 mb-4`}>
                                    <select
                                        className={`form-select city__select w-100 
                                        ${((errors?.city_id && touched.city_id) || backEndErrors?.city_id) ? 'input-error' : '' }`}
                                        aria-label="Default select example"
                                        id='registeration__form__city'
                                        name='city'
                                        value={currChosenCity}
                                        onChange={handleCityChange}
                                    >
                                        <option disabled value=''>Select Your City</option>
                                        {
                                            currCountryCities?.map(city=>{
                                                return (
                                                    <option key={city?.id} value={city?.name}>
                                                        {
                                                            city?.name
                                                        }
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    {((errors?.city_id && touched.city_id) || backEndErrors?.city_id) 
                                    && 
                                    <p className='error-text'>{errors?.city_id || backEndErrors?.city_id[0]}</p>}
                                </div>

                                <div 
                                className={`${((errors?.state && touched.state) || backEndErrors?.state) ? "mb-2" : "mb-3"} 
                                col-md-12 mb-4`}>
                                    <input
                                        value={values?.state}
                                        onChange={handleChange}
                                        type="text"
                                        id='state'
                                        name='state'
                                        placeholder='State'
                                        className={`registeration__form__Sta w-100 
                                        ${((errors?.state && touched.state) || backEndErrors?.state) ? 'input-error' : '' }`}
                                    />
                                    {((errors?.state && touched.state) || backEndErrors?.state) 
                                    && 
                                    <p className='error-text'>{errors?.state || backEndErrors?.state[0]}</p>}
                                </div>

                                <div 
                                className={`${((errors?.phone && touched.phone) || backEndErrors?.phone) ? "mb-2" : "mb-3"} 
                                col-md-12 mb-4`}>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder='Phone Number'
                                        className={`registeration__form__phone w-100 
                                        ${((errors?.phone && touched.phone) || backEndErrors?.phone) ? 'input-error' : ''}`}
                                        onChange={handleChange}
                                        value={values.phone}
                                    />
                                    {((errors?.phone && touched.phone) || backEndErrors?.phone) 
                                    && 
                                    <p className='error-text'>{errors?.phone || backEndErrors?.phone[0]}</p>}
                                </div>

                                {/* <div 
                                className={`${((errors?.zip_code && touched.zip_code) || backEndErrors?.zip_code) ? "mb-2" : "mb-3"} 
                                col-md-6 mb-4`}>
                                    <input
                                        value={values?.zip_code}
                                        onChange={handleChange}
                                        type="text"
                                        name="zip_code"
                                        id="zip_code"
                                        placeholder='Zip Code'
                                        className={`registeration__form__zip_code w-100 
                                        ${((errors?.zip_code && touched.zip_code) || backEndErrors?.zip_code) ? 'input-error' : '' }`}
                                    />
                                    {((errors?.zip_code && touched.zip_code) || backEndErrors?.zip_code) 
                                    && 
                                    <p className='error-text'>{errors?.zip_code || backEndErrors?.zip_code[0]}</p>}
                                </div> */}

                                <div 
                                className={`${((errors?.email && touched.email) || backEndErrors?.email) ? "mb-2" : "mb-3"} 
                                col-md-12 mb-4`}>
                                    <input
                                        value={values?.email.trim()}
                                        onChange={handleChange}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder='Email'
                                        className={`registeration__form__email w-100 
                                        ${((errors?.email && touched.email) || backEndErrors?.email) ? 'input-error' : '' }`}
                                    />
                                    {((errors?.email && touched.email) || backEndErrors?.email) 
                                    && 
                                    <p className='error-text'>{errors.email || backEndErrors?.email[0]}</p>}
                                </div>

                                <div 
                                className={`${((errors?.password && touched.password) || backEndErrors?.password) ? "mb-2" : "mb-3"} 
                                col-md-12 mb-4 position-relative`}>
                                    <input
                                        value={values?.password.trim()}
                                        onChange={handleChange}
                                        type={showPassword ? 'password' : 'text'}
                                        name="password"
                                        id="password"
                                        placeholder='Password'
                                        className={`registeration__form__password w-100 
                                        ${((errors?.password && touched.password) || backEndErrors?.password) ? 'input-error' : '' }`}
                                    />
                                    {
                                        showPassword ? 
                                            <i className={`bi bi-eye 
                                            ${((errors?.password && touched.password) || backEndErrors?.password) ? 'password__eye-err' :'password__eye'} pas-on position-absolute`} onClick={()=> setShowPassword(!showPassword)}></i>
                                            :
                                            <i className={`bi bi-eye-slash 
                                            ${((errors?.password && touched.password) || backEndErrors?.password) ? 'password__eye-err' :'password__eye'} pas-on position-absolute`} onClick={()=> setShowPassword(!showPassword)}></i>
                                    }
                                    {((errors?.password && touched.password) || backEndErrors?.password) 
                                    && 
                                    <p className='error-text'>{errors?.password || backEndErrors?.password}</p>}
                                </div>
                                <div className="registeration__form__btn mb-3 d-flex justify-content-end">
                                    <button name='submitRegister' id='submitRegister' type='submit'
                                    >Register</button>
                                </div>
                                <div className="col-12 text-light">
                                    <span>Already have an account? </span>
                                    <NavLink to={`/${currCountryCode}/login`} className="gotoLoginLink ms-2" onClick={() => scrollToTop()}>
                                        Login now
                                    </NavLink>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        }
        </>
    )
}
