import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { listCompanyDetails } from '../actions/companyActions'

const CompanyDetailsScreen = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const history = useNavigate()
  const companyDetails = useSelector((state) => state.companyDetails)
  const { loading, error, company } = companyDetails

  useEffect(() => {
    if (!company._id || company._id !== params.id) {
      dispatch(listCompanyDetails(params.id))
    }
  }, [dispatch, params])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
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
                  <h3>{company.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Address: {company.address}</ListGroup.Item>
                <ListGroup.Item>Email: {company.email}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default CompanyDetailsScreen
