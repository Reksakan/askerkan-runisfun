const express = require('express'); 
const app = express();
const cors = require('cors');
const axios = require('axios');
const listOfShoes = require('./listOfShoes'); 
const listOfShoesVariances = require('./listOfShoesVariances'); 
const listOfCompliance = require('./listOfCompliance');
const listOfBasket = require('./listOfBasket');


require('dotenv').config();
const port = process.env.PORT || 8080; 
app.use(cors());
app.use(express.json()); 

// app.use('/', listOfShoes);
app.use('/basket', listOfBasket);
app.use('/', listOfShoesVariances);
app.use('/compliance', listOfCompliance);



app.listen(port, () => console.log(`Server is running at the ${port}`));