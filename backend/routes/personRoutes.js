import express from 'express'
const router = express.Router()
import {
  getPersons,
  getPersonById,
  deletePerson,
  createPerson,
  updatePerson,
} from '../controller/personController.js'

router.route('/').get(getPersons).post(createPerson)
router.route('/:id').get(getPersonById).delete(deletePerson).put(updatePerson)

export default router
