require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: [
    'https://seo-analizer-tool-f7yy.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}))


app.use(express.json())

const mainRoutes = require('./routes/mainRoutes')
app.use('/api', mainRoutes) 

app.get('/', (req, res) => {
  res.send('API is running')
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log('Server runs at port'+PORT)
}) 

