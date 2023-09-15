require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mainRoutes = require('./routes/mainRoutes')
app.use('/api', mainRoutes) 


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log('Server runs at port'+PORT)
}) 

