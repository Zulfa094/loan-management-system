const express = require('express')
const router = express.Router()

const Loan = require('../models/loan')
const upload = require('../utils/multer')

router.get('/', async (req, res) => {
  try {
    const populatedLoans = await Loan.find({
      client: req.session.user._id
    }).populate('client')
    console.log('Populated Loans: ', populatedLoans)
    res.render('Loans/index.ejs', { loans: populatedLoans })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.get('/new', async (req, res) => {
  try {
    res.render('loans/new.ejs', { user: req.user })
  } catch (err) {
    console.log(err)
  }
})

router.post('/', upload.single('document'), async (req, res) => {
  try {
    req.body.client = req.session.user._id
    if (req.file) {
      req.body.document = '/uploads/' + req.file.filename
    }
    await Loan.create(req.body)
    populate('client')

    res.redirect('/loans')
  } catch (err) {
    console.log(err)
    res.redirect('/loans')
  }
})

router.get('/:loanId', async (req, res) => {
  try {
    const populatedLoans = await Loan.findById(req.params.loanId).populate(
      'client'
    )
    res.render('loans/show.ejs', { loan: populatedLoans })
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

router.put('/:loanId', upload.single('document'), async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.loanId)
    if (loan.client.equals(req.session.user._id)) {
      if (req.file) {
        req.body.document = req.file.path
      }
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

//Admin

// router.post('/loans/:loanId/approve', async (req, res) => {
//   try {
//     const loan = await Loan.findByIdAndUpdate(
//       req.params.loanId,
//       {
//         status: 'approved'
//       },
//       { new: true }
//     )

//     res.redirect('/loans')
//   } catch (err) {
//     console.log(err)
//     res.redirect('/loans')
//   }
// })

// router.post('/loans/:loanId/reject', async (req, res) => {
//   try {
//     const loan = await Loan.findByIdAndUpdate(
//       req.params.loanId,
//       {
//         status: 'rejected'
//       },
//       { new: true }
//     )

//     res.redirect('/loans')
//   } catch (err) {
//     console.log(err)
//     res.redirect('/loans')
//   }
// })

module.exports = router
