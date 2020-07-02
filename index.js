// You can use http or whichever you like
// I prefer express
// You can also use cloud functions from firebase, it will be a lot easier
const express = require('express');
const app = express();

const cors = require('cors');

const{ payment } = require('./handlers/data');

//// IF YOU CHOOSE TO CALL THIS ON A DIFFERENT LOCATION
//// CHANGE THE ORIGIN FROM WHERE YOU WILL CALL THIS API
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'POST, GET' 
    })
);


//// POST REQUEST IS NEEDED TO ACCESS THIS API
//// CALLING 'GET' WILL ONLY RESULT TO ERROR
app.post('/payment', payment);

app.listen(3000, () => console.log('Server listening on port 3000!'));