const express = require('express')
const router = express.Router()

const Loan = require('../models/loan')

router.get('/', async (req, res) => {
  try {
    const populatedLoans = await Loan.find({}).populate('client')
    console.log('Populated Loans: ', populatedLoans)
    res.render('Loans/index.ejs', { loans: populatedLoans })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.get('/new', async (req, res) => {
  res.render('loans/new.ejs')
})

router.post('/', async (req, res) => {
  req.body.client = req.session.user._id
  await Loan.create(req.body)
  res.redirect('/loans')
})

router.get('/:loansId', async (req, res) => {
  try {
    const populatedLoans = await Loan.findById(
      req.params.loansId.loanId
    ).populate('client')
    res.render('loans/show.ejs')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.get('/:loanId/edit', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.loanId)
    res.render('loans/edit.ejs', { loan })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.put('/:loanId', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.loanId)
    if (loan.client.equals(req.session.user._id)) {
      await loan.updateOne(req.body)
      res.redirect('/loans')
    } else {
      res.send("You don't have permission to do that")
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.delete('/:loanId', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.loanId)
    if (loan.client.equals(req.session.user._id)) {
      await loan.deleteOne()
      res.redirect('/loans')
    } else {
      res.send("You don't have permission to do that")
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

module.exports = router
