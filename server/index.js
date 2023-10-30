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
app.post('/postdistricts', (req, res) => {
    fs.writeFile('../educationdashboard/src/dataImport/districtsData.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log("receiving district data")
        res.status(200).json(result);
    });
});

app.post('/posthomed', (req, res) => {
    fs.writeFile('../educationdashboard/src/dataImport/homeDistrictData.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log("receiving Home page district data")
        res.status(200).json(result);
    });
});
app.post('/posthomes', (req, res) => {
    fs.writeFile('../educationdashboard/src/dataImport/homeSchoolData.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log("receiving Home page school data")
        res.status(200).json(result);
    });
});

app.post('/posth', (req, res) => {
    fs.writeFile('../educationdashboard/src/dataImport/h.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log("receiving High School")
        res.status(200).json(result);
    });
});
app.post('/poste', (req, res) => {
    fs.writeFile('../educationdashboard/src/dataImport/e.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log("receiving Elementary")
        res.status(200).json(result);
    });
});
app.post('/postm', (req, res) => {
    fs.writeFile('../educationdashboard/src/dataImport/m.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log("receiving Middle")
        res.status(200).json(result);
    });
});
app.post('/postp', (req, res) => {
    fs.writeFile('../educationdashboard/src/dataImport/p.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log("receiving Primary")
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


app.listen(PORT, () => {
    console.log(`dashboard listening on ${PORT}`)
})