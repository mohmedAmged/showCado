import React, { useState } from 'react'
import './fixedPopUp.css'
import { countrySchema } from '../../validation/CountryValidation';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
export default function FixedPopUp({ countriesData }) {
    const navigate = useNavigate();
    const [showErrors ,setShowErrors] = useState(false);
    const onSubmit = async (values,actions)=>{
        const isValid = await countrySchema.validate(values);
        if(isValid){
            const currentChosenCountry = values.country;
            setShowErrors(false);
            localStorage.setItem('curr-country',currentChosenCountry)
            navigate(`/${currentChosenCountry}`);
            window.location.reload()
        }
    };
    const { values , errors , handleBlur , handleChange , handleSubmit} = useFormik({
        initialValues:{
            country: ""
        },
        validationSchema: countrySchema,
        onSubmit,
    });
    return (
        <div
            className="fixedPopUp__sec"
        >
            <div className="overlay"></div>
            <div className="fixedPopUp__modal">
                <h3>
                    welcome to valuReach
                </h3>
                <p>
                    please select your country
                </p>
                <form onSubmit={handleSubmit} onBlur={handleBlur}>
                    <select
                    className={`popup__select ${errors.country ? "input-error" : ""}`}
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    id='country'
                    >
                        <option value="" disabled>Choose Country</option>
                        {
                            countriesData?.map((country, index)=>(
                                <option  key={country.id} value={country.code}>      {country.name} ({country.code})
                                </option>
                            ))
                        }
                    </select>
                    {
                        showErrors ?
                            <p className='error-text text-capitalize mt-2'>
                                {errors.country}
                            </p>
                            :''
                    }
                    <button 
                    className='popUp__btn' 
                    type='submit'
                    name='countrySubmintBtn'
                    id='countrySubmintBtn'
                    onClick={()=> setShowErrors(true)}
                    >Save Changes</button>
                </form>
            </div>
        </div>
    )
}
