import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { scrollToTop } from '../../functions/scrollToTop'
import { LoginSchema } from '../../validation/LoginSchema';
import { useFormik } from 'formik';
import { baseURL, currCountryCode } from '../../functions/BaseURL';
import Loader from '../loader/Loader';
import Swal from 'sweetalert2';

export default function Login({handleLoginOrRegister}) {
    const [showPassword,setShowPassword] = useState(true);
    const [showContent, setShowContent] = useState(true);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowContent(false);
        }, 800);
        return () => clearTimeout(timeoutId);
    });

    const navigate = useNavigate();
    const [backEndErrors, setBackEndErrors] = useState(null);
    const onSubmit = async (values, actions) => {
        const isValid = await LoginSchema.validate(values);

        if(isValid){
            const res = await fetch(`${baseURL}/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(values)
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
                handleLoginOrRegister(response?.data?.token);
                navigate(`/${currCountryCode}/user/dashboard`)
            }else {
                setBackEndErrors(response.errors)
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

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: LoginSchema,
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
                        <div className='mx-auto registeration__form login__form col-md-8'>
                            <h2 className='text-center mb-4'>login</h2>
                            <form
                                action="Post"
                                className='px-5 m-0 pt-3 row gapY-3'
                                onSubmit={handleSubmit}
                                onBlur={handleBlur}
                            >

                                <div className={`${((errors?.email && touched.email) || backEndErrors?.email)  ? "mb-2" : "mb-4"} col-12 mb-4`}>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder='Email'
                                        onChange={handleChange}
                                        value={values.email.trim()}
                                        className={`loginForm__email w-100 ${((errors?.email && touched.email) || backEndErrors?.email)  ? "input-error" : ""}`}
                                        />
                                    {
                                    ((errors?.email && touched.email) || backEndErrors?.email)  
                                    && 
                                    <p className='error-text mb-3'>{errors.email || backEndErrors?.email[0]}</p>
                                    }
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



                                <div className="registeration__form__btn d-flex justify-content-end mb-3">

                                    <button 
                                    id='loginSubmit'
                                    name='loginSubmit'
                                    type='submit'
                                    >Login</button>
                                </div>
                                <div className="col-12 text-light">
                                    <span>Don't Have and account?</span>
                                    <NavLink to={`/${currCountryCode}/register`} onClick={() => scrollToTop()} className="gotoLoginLink ms-2">
                                        Create New Account
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
