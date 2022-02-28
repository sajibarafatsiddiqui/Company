import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { listPersonDetails } from '../actions/personAction'

const PersonDetailsScreen = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const history = useNavigate()
  const personDetails = useSelector((state) => state.personDetails)
  const { loading, error, person } = personDetails

  useEffect(() => {
    if (!person._id || person._id !== params.id) {
      dispatch(listPersonDetails(params.id))
    }
  }, [dispatch, params])

  return (
    <>
      <Link className='btn btn-light my-3' to='/persons'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{person.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Address: {person.address}</ListGroup.Item>
                <ListGroup.Item>Mobile: {person.mobile}</ListGroup.Item>
                <ListGroup.Item>Company: {person.company}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default PersonDetailsScreen
