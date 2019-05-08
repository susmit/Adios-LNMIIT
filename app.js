const express = require('express')
const path = require('path')
const ejs = require('ejs')

const app = express()
app.engine('.html', ejs.__express)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use('/public', express.static(path.join(__dirname, 'public')))

var router = require('./route/main')
router(app)

app.listen(3000);

console.log("Running at Port 3000");

module.exports = app