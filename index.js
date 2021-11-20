const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { createCanvas } = require("canvas");


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','x-test');
    res.setHeader('Content-Type', 'application/json');
    next();
  });

app.use(bodyParser.urlencoded({extended : false}));

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.use(express.json())
app.use(bodyParser.text());
app.options('*', cors());

app.get('/image', (req, res) => {
    const canvas = createCanvas(+req.query.width, +req.query.height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, +req.query.width, +req.query.height);
    ctx.fillStyle = "#f2f2f2";
    ctx.font = "32px Arial";
    ctx.fillText("Hello", 13, 35);

    
    const buffer = canvas.toBuffer("image/png");

    res.set('Content-disposition', 'attachment; filename=image');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
});

app.post('/login', (req, res) => {
    res.send('germanleton');
});

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});
