require('dotenv').config();
const express = require('express')
const cors = require('cors')

const app = express()

// Specify the allowed origins as an array of URLs
const allowedOrigins = ['https://seo-analizer-tool-f7yy.vercel.app/', 'https://localhost:3000'];

// Configure CORS to allow only the specified origins
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (cookies, authorization headers)
}));




app.use(cors())
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

