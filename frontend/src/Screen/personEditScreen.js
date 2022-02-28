import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import FormContainer from './FormContainer'
import { listPersonDetails, updatePerson } from '../actions/personAction'
import { PERSON_UPDATE_RESET } from '../constant/personConstant'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'

const PersonEditScreen = () => {
  const params = useParams()
  const history = useNavigate()
  const personId = params.id

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [company, setCompany] = useState('')

  const dispatch = useDispatch()

  const personDetails = useSelector((state) => state.personDetails)
  const { loading, error, person } = personDetails

  const personUpdate = useSelector((state) => state.personUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = personUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PERSON_UPDATE_RESET })
      history('/persons')
    } else {
      if (!person.name || person._id !== personId) {
        dispatch(listPersonDetails(personId))
      } else {
        setName(person.name)
        setAddress(person.address)
        setMobile(person.Mobile)
      }
    }
  }, [dispatch, history, personId, person, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updatePerson({
        _id: personId,
        name,
        address,
        mobile,
        company,
      })
    )
  }
  const companyList = useSelector((state) => state.companyList)
  const { companies } = companyList
  const options = companies.map((d) => ({
    value: d.id,
    label: d.name,
  }))
  return (
    <>
      <Link to='/persons' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Person</h1>
        {loadingUpdate && <Loader />}
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
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Mobile'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Company</Form.Label>
              <Form.Control>
                <Select
                  options={this.state.selectOptions}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default PersonEditScreen
