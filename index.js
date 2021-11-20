const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


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

app.get('/result4/', (req, res) => {
    res.json({
        message: 'neveraskedfor',
        'x-body': req.body,
        'x-result': req.header('x-test')
    });
});

app.post('/result4/', (req, res) => {
    res.json({
        message: 'neveraskedfor',
        'x-body': req.body,
        'x-result': req.header('x-test')
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port 3000', '');
});
