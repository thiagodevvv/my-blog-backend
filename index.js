require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path =  require('path')
const app = express()

const cookieParser = require('cookie-parser')

const PORT = 8000

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '/src/routes/public')))
app.use(require('./src/routes'))


app.listen(PORT, () => console.log(`Server started in port:: ${PORT}`))