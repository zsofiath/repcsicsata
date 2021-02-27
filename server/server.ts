

import * as express from 'express';
import {Application} from "express";
import { placePlanes } from './PlacePlanes';

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

// POST method route
app.post('/api/place-planes', function (req, res) {
    res.send('POST request to the homepage')
})


const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




