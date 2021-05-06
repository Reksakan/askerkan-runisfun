const express = require('express'); 
const app = express();
const cors = require('cors');
const axios = require('axios');
const listOfShoesVariances = require('./listOfShoesVariances'); 
// const listOfCompliance = require('./listOfCompliance');
const listOfBasket = require('./listOfBasket');


require('dotenv').config();
const port = process.env.PORT || 3000; 
app.use(cors());
app.use(express.json()); 

app.use(express.static("public"));
app.use('/basket', listOfBasket);
app.use('/', listOfShoesVariances);
// app.use('/compliance', listOfCompliance); //shoud work on it later. 

app.listen(port, () => console.log(`Server is running at the ${port}`));