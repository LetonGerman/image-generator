import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import canvas from 'canvas';
const { createCanvas } = canvas;
import fetch from 'node-fetch';

const app = express();

let JWT = null;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','x-test');
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

app.get('/makeimage', (req, res) => {
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

app.get('/wordpress', async (req, res) => {

    if (!JWT) {
        const response = await fetch('https://wordpress.kodaktor.ru/wp-json/jwt-auth/v1/token', 
        {
            method: 'POST', 
            body: JSON.stringify({ "username": "gossjsstudent2017", "password": "|||123|||456" }),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        JWT = data.token;
    }
    
    const wpResponse = await fetch('https://wordpress.kodaktor.ru/wp-json/wp/v2/posts', 
        {
            method: 'POST', 
            body: JSON.stringify({ "title": "germanleton", "content": req.query.content, "status": "publish" }),
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${JWT}`}
        });
    const wpPostData = await wpResponse.json();
    if (!wpPostData) {
        res.send("Not found :(");
        return;
    }
    await res.send(`${wpPostData.id}`);
});

app.get('/login', (req, res) => {
    res.send('germanleton');
});

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});