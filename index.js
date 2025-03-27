const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middlewate
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`Foodies server setting on port ${port}`);
})