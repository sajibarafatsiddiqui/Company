import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import FormContainer from './FormContainer'
import { listCompanyDetails, updateCompany } from '../actions/companyActions'
import { COMPANY_UPDATE_RESET } from '../constant/companyConstant'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'

const CompanyEditScreen = () => {
  const params = useParams()
  const history = useNavigate()
  const companyId = params.id

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const companyDetails = useSelector((state) => state.companyDetails)
  const { loading, error, company } = companyDetails

  const companyUpdate = useSelector((state) => state.companyUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = companyUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: COMPANY_UPDATE_RESET })
      history('/')
    } else {
      if (!company.name || company._id !== companyId) {
        dispatch(listCompanyDetails(companyId))
      } else {
        setName(company.name)
        setAddress(company.address)
        setEmail(company.email)
      }
    }
  }, [dispatch, history, companyId, company, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCompany({
        _id: companyId,
        name,
        address,
        email,
      })
    )
  }

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Company</h1>

        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='adress'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' block='block'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CompanyEditScreen
