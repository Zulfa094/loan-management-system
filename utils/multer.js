const multer = require('multer')
const path = require('path')

// Define storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // specify the directory where the file will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // generate a unique filename
  }
})

const upload = multer({ storage: storage })

module.exports = upload
