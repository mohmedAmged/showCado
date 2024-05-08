import { useFormik } from 'formik';
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { VoteDiscoverSchema } from '../../validation/voteDiscoverSchema';
import Swal from 'sweetalert2';
import { baseURL, currCountryCode } from '../../functions/BaseURL';
export default function VoteModal({ show, handleClose, discoversSubCategData, discoverSubCategName, sub_categ_ID, token }) {
    // console.log(sub_categ_ID);
    console.log(discoversSubCategData);
    const [backEndErrors, setBackEndErrors] = useState(null);

    const onSubmit = async (values, actions) => {
        const isValid = await VoteDiscoverSchema.validate(values);
        if (isValid) {
            const res = await fetch(`${baseURL}/${currCountryCode}/votes`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });
            const response = await res.json();
            console.log(response);
            if (response?.status === 200) {
                setBackEndErrors(null);
                actions.resetForm();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${response.message}`,
                    showConfirmButton: false,
                    timer: 2000
                });
                handleClose()
            } else {
                setBackEndErrors(response?.errors);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${response?.errors?.discover_ids[0] ? response?.errors?.discover_ids[0] : response?.errors?.discover_id[0] ? response?.errors?.discover_id[0] : response?.message?.discover_ids[0] ? response?.message?.discover_ids[0] : 'Something went wrong!'}`
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        }

    };

    const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            discover_sub_category_id: sub_categ_ID,
            discover_id: "",
            discover_ids: []
        },
        validationSchema: VoteDiscoverSchema,
        onSubmit,
    });
    const handleCheckboxChange = (el) => {
        const discoverId = String(el?.discover_id);
        if (discoversSubCategData?.length > 10) {
            // If more than 10 discovers, push to discover_ids array
            const discoverIds = values.discover_ids || [];
            const index = discoverIds.indexOf(discoverId);
            if (index === -1) {
                discoverIds.push(discoverId);
            } else {
                discoverIds.splice(index, 1);
            }
            setFieldValue('discover_ids', discoverIds);
        } else {
            // If 10 or fewer discovers, assign directly to discover_id
            setFieldValue('discover_id', discoverId);
        }
    };

    let voteText;
    if (discoversSubCategData?.length > 10) {
        voteText = "You need to vote for 3 items";
    } else if (discoversSubCategData?.length === 1) {
        voteText = "You cannot vote for one item";
    } else {
        voteText = "You need to vote for 1 item";
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={true} centered>
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h2>
                                give your vote
                            </h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>check your best {discoverSubCategName} places</h4>
                        <form
                            onSubmit={handleSubmit}
                            onBlur={handleBlur}
                        >
                            <div class="form-check form__check__handler" id="formCheck">
                                {
                                    discoversSubCategData?.map((el) => (
                                        <div key={el?.discover_name} className="input__form__handler">
                                            <input className="form-check-input" type="checkbox"
                                                value={String(el?.discover_id)}
                                                checked={values.discover_ids?.includes(String(el?.discover_id)) || values.discover_id === String(el?.discover_id)}
                                                onChange={() => handleCheckboxChange(el)}
                                                id={String(el?.discover_id)} />
                                            <label class="form-check-label" htmlFor={String(el?.discover_id)}>
                                                {el?.discover_name}
                                            </label>
                                        </div>
                                    ))
                                }

                            </div>
                            <div className='vote__text__numbers'>
                                <i className="bi bi-patch-exclamation me-2"></i>{voteText}
                            </div>
                            <div class="form__vote__submit d-flex justify-content-center">
                                <button type='submit' onClick={handleClose} class='btn__vote__submit'>
                                    submit your vote <i class="bi bi-hand-thumbs-up"></i>
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </>

            </Modal>
        </>
    )
}
