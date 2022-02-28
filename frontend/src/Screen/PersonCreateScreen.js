import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import FormContainer from './FormContainer'
import { listCompanies, createPerson } from '../actions/personAction'
import { PERSON_CREATE_RESET } from '../constant/personConstant'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
const PersonCreateScreen = () => {
  const params = useParams()
  const history = useNavigate()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [company, setCompany] = useState('')
  const companyList = useSelector((state) => state.companyList)

  const { companies } = companyList
  console.log(companies)
  const options = companies.map((d) => ({
    value: d.id,
    label: d.name,
  }))

  const dispatch = useDispatch()

  const personCreate = useSelector((state) => state.personCreate)
  const { loading, error, success, newPerson } = personCreate

  useEffect(() => {
    if (success) {
      dispatch({ type: PERSON_CREATE_RESET })
      history('/')
    }
  }, [dispatch, history, success, newPerson])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createPerson({ name, address, mobile, company }))
  }

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Create Person</h1>
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
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Mobile'
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Select
              value={company}
              onChange={(e) => {
                console.log(e)
                setCompany(e.label)
              }}
              options={options}
            ></Select>
            <Button type='submit' variant='primary' block='block'>
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default PersonCreateScreen
