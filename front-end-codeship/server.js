const express = require('express');
require('dotenv').config()
const route = express()
route.use(express.static(__dirname + '/build'));
console.log(__dirname)
route.get('/', (req, res) =>{
    res.sendFile(__dirname + '/build/index.html')
});
route.listen(process.env.PORT)