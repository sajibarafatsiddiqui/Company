import asyncHandler from 'express-async-handler'
import Company from '../model/company.js'

const getCompanies = asyncHandler(async (req, res) => {
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

  const count = await Company.countDocuments({ ...keyword })
  const companies = await Company.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ companies, page, pages: Math.ceil(count / pageSize) })
})

const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id)

  if (company) {
    res.json(company)
  } else {
    res.status(404)
    throw new Error('Company not found')
  }
})

const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id)

  if (company) {
    await company.remove()
    res.json({ message: 'Company removed' })
  } else {
    res.status(404)
    throw new Error('Company not found')
  }
})

const createCompany = asyncHandler(async (req, res) => {
  const { name, address, email } = req.body
  const company = new Company({
    name: name,
    address: address,
    email: email,
  })

  const createdCompany = await company.save()
  res.status(201).json(createdCompany)
})

const updateCompany = asyncHandler(async (req, res) => {
  const { name, address, email } = req.body

  const company = await Company.findById(req.params.id)

  if (company) {
    company.name = name
    company.address = address
    company.email = email

    const updatedCompany = await company.save()
    res.json(updatedCompany)
  } else {
    res.status(404)
    throw new Error('Company not found')
  }
})

export {
  getCompanies,
  getCompanyById,
  deleteCompany,
  createCompany,
  updateCompany,
}
