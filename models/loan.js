const mongoose = require('mongoose')

const loanSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    name: {
      type: String,
      required: true,
      minlength: 2
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{8}$/
    },
    occupation: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true,
      min: 100
    },
    company: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    interestRate: {
      type: Number,
      required: true,
      min: 0
    },
    duration: {
      type: Number,
      required: true
    },
    document: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Loan = mongoose.model('Loan', loanSchema)
module.exports = Loan
