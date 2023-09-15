const express = require('express')
const router = express.Router()

const {postUrl, getPostData} = require('../controller/mainController')

router.post('/send-url', postUrl)
router.post('/get-data', getPostData)


module.exports = router