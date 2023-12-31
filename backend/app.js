const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const {dirname, join} = require('path')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT | 8080

exports.SECRET_KEY = "abcdefghijklmnopqrstuvwxyz";

//middlewares
app.use(express.json())
app.use(cors())
app.use('/media', express.static('uploads'))
app.use('/static', express.static(join(dirname(__dirname), '/frontend/build/static')))

//home route
app.get('/', (req, res) => {res.sendFile(join(dirname(__dirname), '/frontend/build/index.html'))})

//routes
readdirSync('./routes').map((route) => app.use('/api', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()