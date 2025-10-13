const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/src')));

app.use((req, res) => {
    res.status(404);
    res.send('src/error.html')
})

app.listen(3000, () =>  {
    console.log("Listening on Port 3000");
})