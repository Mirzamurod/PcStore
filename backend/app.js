const app = require('express')()
const dotenv = require('dotenv').config()
const colors = require('colors')

app.get('/', (req, res) => {
    res.send('This is Root page!!!')
})

app.get('/contact', (req, res) => {
    res.send('This page is Contact')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server ishga tushdi. Port ${port}`.yellow.bold)
})
