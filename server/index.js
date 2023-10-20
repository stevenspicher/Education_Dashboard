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

app.post('/post', (req, res) => {
    fs.writeFile('../educationdashboard/src/dataImport/dataFile.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        let result = (req.body);
        console.log(result)
        res.status(200).json(result);
    });
});

app.listen(PORT, () => {
    console.log(`dashboard listening on ${PORT}`)
})