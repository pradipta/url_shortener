const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

//cors
app.use(cors());

app.use(express.json({ extended : false}));

//routes

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

//const PORT = 3000;

const PORT =  process.env.PORT;

if (PORT!=undefined){
    app.listen(PORT, () => console.log(`App running on port ${PORT}`));
}else{
    console.log('PORT not found on env');
}