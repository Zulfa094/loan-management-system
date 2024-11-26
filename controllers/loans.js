const express = require('express')
const router = express.Router()

const Loan = require('../models/loan')

router.get('/', async (req, res) => {
  const loans = await Loan.find().populate('client')
  res.render('loan/index.ejs', { loans })
})

router.get('/new', async (req, res) => {
  res.render('loan/new.ejs')
})

router.post('/', async (req, res) => {
  const loan = await Loan.create({
    borrower: req.session.user._id,
    amount: req.body.amount,
    interestRate: req.body.interestRate,
    duration: req.body.duration
  })
  res.redirect(`/loans/${loan._id}`)
})

// Show: Loan details
router.get('/:id', async (req, res) => {
  const loan = await Loan.findById(req.params.id).populate('borrower')
  res.render('loan/show.ejs', { loan })
})

// Edit: Loan update form
router.get('/:id/edit', async (req, res) => {
  const loan = await Loan.findById(req.params.id)
  res.render('loan/edit.ejs', { loan })
})

router.put('/:id', async (req, res) => {
  const { amount, interestRate, duration, status } = req.body
  await Loan.findByIdAndUpdate(req.params.id, {
    amount,
    interestRate,
    duration,
    status
  })
  res.redirect(`/loans/${req.params.id}`)
})

router.delete('/:id', async (req, res) => {
  await Loan.findByIdAndDelete(req.params.id)
  res.redirect('/loans')
})

module.exports = router
