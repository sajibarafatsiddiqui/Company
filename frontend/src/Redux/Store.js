import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  companyListReducer,
  companyDetailsReducer,
  companyDeleteReducer,
  companyCreateReducer,
  companyUpdateReducer,
} from './reducer/companyReducer'
import {
  personListReducer,
  personDetailsReducer,
  personDeleteReducer,
  personCreateReducer,
  personUpdateReducer,
} from './reducer/personReducer'

const reducer = combineReducers({
  companyList: companyListReducer,
  companyDetails: companyDetailsReducer,
  companyDelete: companyDeleteReducer,
  companyCreate: companyCreateReducer,
  companyUpdate: companyUpdateReducer,
  personList: personListReducer,
  personDetails: personDetailsReducer,
  personDelete: personDeleteReducer,
  personCreate: personCreateReducer,
  personUpdate: personUpdateReducer,
})

const middleware = [thunk]
const initialState = {}

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
