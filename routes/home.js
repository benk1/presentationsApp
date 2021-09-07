const express = require('express')
const router = express.Router()

router.get('/presenters',(req,res) =>{
    res.send(presenters)
})