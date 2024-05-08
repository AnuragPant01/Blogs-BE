const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/blogs',(req,res)=>{
    fs.readFile('./blogs.json',(err,data)=>{
        res.status(200).send(data.toString())
    })
})

app.post('/blogs', (req, res) => {
    let dataToStore = JSON.stringify(req.body);

    fs.readFile('./blogs.json', function (err, data) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                status: 500,
                message: 'Error reading blogs.json'
            });
        }

        let json;
        try {
            json = JSON.parse(data);
        } catch (error) {
            json = [];
        }
        
        json.push(JSON.parse(dataToStore));
        fs.writeFile('./blogs.json', JSON.stringify(json), function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    status: 500,
                    message: 'Error writing to blogs.json'
                });
            }
            res.status(200).send({
                status: 200,
                message: 'Data Stored'
            });
        });
    });
});



app.listen('3030')