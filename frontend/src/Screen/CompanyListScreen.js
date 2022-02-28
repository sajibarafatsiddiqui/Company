import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import Paginate from '../component/Pagination'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import {
  listCompanies,
  listCompanyDetails,
  deleteCompany,
  createCompany,
} from '../actions/companyActions'
import { COMPANY_CREATE_RESET } from '../constant/companyConstant'

const CompanyListScreen = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()
  const history = useNavigate()
  const companyList = useSelector((state) => state.companyList)
  const { loading, error, companies, page, pages } = companyList

  const companyDelete = useSelector((state) => state.companyDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = companyDelete

  const companyCreate = useSelector((state) => state.companyCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    company: createdCompany,
  } = companyCreate

  useEffect(() => {
    dispatch({ type: COMPANY_CREATE_RESET })

    if (successCreate) {
      history(`company/${createdCompany._id}/edit`)
    } else {
      dispatch(listCompanies('', pageNumber))
    }
  }, [
    dispatch,
    history,
    successDelete,
    successCreate,
    createdCompany,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCompany(id))
    }
  }

  const createCompanyHandler = () => {
    dispatch(createCompany())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Companies</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to='/company/create'>
            <Button>
              <i className='fas fa-plus'></i> Create Company
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
                <th>EMAIL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id}>
                  <td>{company._id}</td>
                  <td>{company.name}</td>
                  <td>{company.address}</td>
                  <td>{company.email}</td>
                  <td>
                    <LinkContainer to={`/company/${company._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(company._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                  <td>
                    <LinkContainer to={`/company/${company._id}`}>
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

export default CompanyListScreen
