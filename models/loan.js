const mongoose = require('mongoose')

const loanSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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
    }
  },
  { timestamps: true }
)

const Loan = mongoose.model('Loan', loanSchema)
module.exports = Loan
