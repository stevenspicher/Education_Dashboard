import express from  'express';
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const PORT = 5001;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json())
app.use(cors({
    origin: "*",
}));

app.use(express.static('public'))

app.post('/poststate', (req, res) => {
    fs.writeFile('../educationdashboard/src/dataImport/stateData.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log('receiving state data')
        res.status(200).json(result);
    });
});

app.post('/postall', (req, res) => {
    fs.writeFile('../educationdashboard/src/dataImport/allSchoolsData.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log('receiving school data')
        res.status(200).json(result);
    });
});






app.post('/postservefile', (req, res) => {
    fs.writeFile('./public/api.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log("receiving API")
        res.status(200).json(result);
    });
});

app.post('/postgeodata', (req, res) => {
    fs.writeFile('./public/geodata.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log("receiving geodata")
        res.status(200).json(result);
    });
});



app.listen(PORT, () => {
    console.log(`dashboard listening on ${PORT}`)
})

