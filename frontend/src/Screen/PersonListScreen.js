import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import Paginate from '../component/Pagination'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import {
  listPersons,
  deletePerson,
  createPerson,
} from '../actions/personAction'
import { PERSON_CREATE_RESET } from '../constant/personConstant'

const PersonListScreen = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()
  const history = useNavigate()
  const personList = useSelector((state) => state.personList)

  const { loading, error, persons, page, pages } = personList
  console.log(personList)
  const personDelete = useSelector((state) => state.personDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = personDelete

  const personCreate = useSelector((state) => state.personCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    person: createdPerson,
  } = personCreate

  useEffect(() => {
    dispatch({ type: PERSON_CREATE_RESET })

    if (successCreate) {
      history(`company/${createdPerson._id}/edit`)
    } else {
      dispatch(listPersons('', pageNumber))
    }
  }, [
    dispatch,
    history,
    successDelete,
    successCreate,
    createdPerson,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePerson(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Persons</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to='/person/create'>
            <Button>
              <i className='fas fa-plus'></i> Create Person
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>ADDRESS</th>
                <th>MOBILE</th>
                <th>COMPANY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {persons.length > 0 &&
                persons.map((person) => (
                  <tr key={person._id}>
                    <td>{person._id}</td>
                    <td>{person.name}</td>
                    <td>${person.address}</td>
                    <td>{person.mobile}</td>
                    <td>{person.company}</td>
                    <td>
                      <LinkContainer to={`/person/${person._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(person._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                    <td>
                      <LinkContainer to={`/person/${person._id}`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-info'></i>
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} />
        </>
      )}
    </>
  )
}

export default PersonListScreen
