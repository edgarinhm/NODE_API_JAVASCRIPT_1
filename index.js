const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./src/config/corsOptions');
const { logger } = require('./src/middleware/logEvents');
const errorHandler = require('./src/middleware/errorHandler');
require('dotenv').config();
const PORT = process.env.PORT;

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/signup', require('./src/routes/signup'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));