import asyncHandler from 'express-async-handler'
import Person from '../model/person.js'

const getPersons = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Person.countDocuments({ ...keyword })
  const persons = await Person.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ persons, page, pages: Math.ceil(count / pageSize) })
})

const getPersonById = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id)

  if (person) {
    res.json(person)
  } else {
    res.status(404)
    throw new Error('Person not found')
  }
})

const deletePerson = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id)

  if (person) {
    await person.remove()
    res.json({ message: 'Person removed' })
  } else {
    res.status(404)
    throw new Error('Person not found')
  }
})

const createPerson = asyncHandler(async (req, res) => {
  const { name, address, mobile, company } = req.body

  const person = new Person({
    name: name,
    address: address,
    mobile: mobile,
    company: company,
  })

  const createdPerson = await person.save()
  res.status(201).json(createdPerson)
})

const updatePerson = asyncHandler(async (req, res) => {
  const { name, address, mobile, company } = req.body

  const person = await Person.findById(req.params.id)

  if (person) {
    company.name = name
    company.address = address
    company.email = email

    const updatedPerson = await person.save()
    res.json(updatedCompany)
  } else {
    res.status(404)
    throw new Error('Person not found')
  }
})

export { getPersons, getPersonById, deletePerson, createPerson, updatePerson }
