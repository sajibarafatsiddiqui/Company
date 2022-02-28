import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import FormContainer from './FormContainer'
import { listCompanies, createCompany } from '../actions/companyActions'
import { COMPANY_CREATE_RESET } from '../constant/companyConstant'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'

const CompanyCreateScreen = () => {
  const params = useParams()
  const history = useNavigate()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState({ name: '', address: '', email: '' })
  const dispatch = useDispatch()

  const companyCreate = useSelector((state) => state.companyCreate)
  const { loading, error, success, newCompany } = companyCreate

  useEffect(() => {
    if (success) {
      dispatch({ type: COMPANY_CREATE_RESET })
      history('/')
    }
  }, [dispatch, history, success, newCompany])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createCompany({ name, address, email }))
  }

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Create Company</h1>
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
                onChange={(e) => {
                  setAddress(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' block='block'>
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CompanyCreateScreen
