import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { baseURL } from '../../functions/BaseURL';
import { RecommendUsSchema } from '../../validation/RecommendUsSchema';
import { useFormik } from 'formik';
export default function RecommendUsModal({showRecommend, handleCloseRecommend, discoverSubCategName, token}) {
    const [backEndErrors, setBackEndErrors] = useState(null);
    const onSubmit = async (values, actions) => {
        const isValid = await RecommendUsSchema.validate(values);
        if(isValid){
            const res = await fetch(`${baseURL}/recommend-new-discover`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });
            const response = await res.json();
            // console.log(response);
            if(response?.status === 200){
                setBackEndErrors(null);
                actions.resetForm();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${response.message}`,
                    showConfirmButton: false,
                    timer: 2000
                });
                handleCloseRecommend()
            }else {
                setBackEndErrors(response?.errors);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${response?.errors?.description[0] ? response?.errors?.description[0] : response?.errors?.name[0] ? response?.errors?.name[0] : 'Something went wrong!'}`
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
    const { values, touched , errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: RecommendUsSchema,
        onSubmit,
    });
    return (
        <>
            <Modal show={showRecommend} onHide={handleCloseRecommend} animation={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>
                            Recommend a {discoverSubCategName} place
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form 
                    // action="Post" 
                    onSubmit={handleSubmit}
                    onBlur={handleBlur}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={values?.name}
                                onChange={handleChange}
                                type="text"
                                id='name'
                                name='name'
                                placeholder="name"
                                className={`first_name__input w-100 
                                ${((errors?.name && touched?.name) || backEndErrors?.name) ? 'input-error' : '' }`}
                                autoFocus
                            />
                            {((errors?.name && touched?.name) || backEndErrors?.name) 
                                    && 
                                    <p className='error-text'>{errors?.name || backEndErrors?.name}</p>}
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea" rows={3}
                                value={values?.description}
                                onChange={handleChange}
                                type="text"
                                id='description'
                                name='description'
                                placeholder="description"
                                className={`first_name__input w-100 
                                ${((errors?.description && touched?.description) || backEndErrors?.description) ? 'input-error' : '' }`}
                            />
                            {((errors?.description && touched?.description) || backEndErrors?.description) 
                                    && 
                                    <p className='error-text'>{errors?.description || backEndErrors?.description}</p>}
                        </Form.Group>
                        <div  className="form__vote__submit">
                            <button type='submit' className='btn__vote__submit'>
                                Submit your recommend
                                <i className="bi bi-hand-thumbs-up"></i>
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
