const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// # ejs settings   
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if(process.env.NODE_ENV ===  'development') app.use(morgan('dev'));
app.use((req, res, next) => {
    req.doby = Date.now();  
})


app.listen(process.env.PORT, () => console.log('server runing'));