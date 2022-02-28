import express from 'express'
const router = express.Router()
import {
  getCompanies,
  getCompanyById,
  deleteCompany,
  createCompany,
  updateCompany,
} from '../controller/companyController.js'

router.route('/').get(getCompanies).post(createCompany)
router
  .route('/:id')
  .get(getCompanyById)
  .delete(deleteCompany)
  .put(updateCompany)

export default router
