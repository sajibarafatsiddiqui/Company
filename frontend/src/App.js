import logo from './logo.svg'
import './App.css'
import { Container } from 'react-bootstrap'
import Header from './Screen/Header'
import Footer from './Screen/Footer'
import CompanyDetailsScreen from './Screen/CompanyDetailsScreen'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CompanyListScreen from './Screen/CompanyListScreen'
import CompanyEditScreen from './Screen/CompanyEditScreen'
import PersonListScreen from './Screen/PersonListScreen'
import PersonDetailsScreen from './Screen/PersonDetailsScreen'
import PersonEditScreen from './Screen/personEditScreen'
import CompanyCreateScreen from './Screen/CompanyCreateScreen'
import PersonCreateScreen from './Screen/PersonCreateScreen'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main>
          <Container className='my-3'>
            <Routes>
              <Route exact path='/' element={<CompanyListScreen />} />
              <Route path='/company/:id' element={<CompanyDetailsScreen />} />
              <Route path='/company/create' element={<CompanyCreateScreen />} />
              <Route path='/company/:id/edit' element={<CompanyEditScreen />} />
              <Route exact path='/persons' element={<PersonListScreen />} />
              <Route path='/person/:id' element={<PersonDetailsScreen />} />
              <Route path='/person/create' element={<PersonCreateScreen />} />
              <Route path='/person/:id/edit' element={<PersonEditScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
