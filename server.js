const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const path = require('path')
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')

const isSignedIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')
const isAdmin = require('./middleware/is-admin')

const port = process.env.PORT ? process.env.PORT : '3000'

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(passUserToView)

app.use((req, res, next) => {
  if (req.session.message) {
    res.locals.message = req.session.message
    req.session.message = null
  } else {
    res.locals.message = null
  }
  next()
})

const authController = require('./controllers/auth')
const loanController = require('./controllers/loans')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use('/auth', authController)
app.use('/loans', isSignedIn, loanController)

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}`)
})

app.get('/', async (req, res) => {
  res.render('index.ejs')
})
