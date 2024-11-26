const mongoose = require('mongoose')

const loanSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    amount: {
      type: Number,
      required: true
    },
    interestRate: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
    }, // Duration in months
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected']
    }
  },
  { timestamps: true }
)

const Loan = mongoose.model('Loan', loanSchema)
module.exports = Loan
