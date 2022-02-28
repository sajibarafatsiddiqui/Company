import axios from 'axios'
import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_DETAILS_FAIL,
  COMPANY_DELETE_SUCCESS,
  COMPANY_DELETE_REQUEST,
  COMPANY_DELETE_FAIL,
  COMPANY_CREATE_REQUEST,
  COMPANY_CREATE_SUCCESS,
  COMPANY_CREATE_FAIL,
  COMPANY_UPDATE_REQUEST,
  COMPANY_UPDATE_SUCCESS,
  COMPANY_UPDATE_FAIL,
} from '../constant/companyConstant'

export const listCompanies =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: COMPANY_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/companies?keyword=${keyword}&pageNumber=${pageNumber}`
      )

      dispatch({
        type: COMPANY_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: COMPANY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listCompanyDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMPANY_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/companies/${id}`)

    dispatch({
      type: COMPANY_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COMPANY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCompany = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_DELETE_REQUEST,
    })

    await axios.delete(`/api/companies/${id}`)

    dispatch({
      type: COMPANY_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: COMPANY_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createCompany = (newCompany) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/companies`, newCompany)

    dispatch({
      type: COMPANY_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: COMPANY_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateCompany = (company) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_UPDATE_REQUEST,
    })

    const { data } = await axios.put(`/api/companies/${company._id}`, company)

    dispatch({
      type: COMPANY_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: COMPANY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: COMPANY_UPDATE_FAIL,
      payload: message,
    })
  }
}
