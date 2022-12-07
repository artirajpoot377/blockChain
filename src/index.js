const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Comrade31:B93EgLm7P9wmaRx@cluster-lithium.qso5elz.mongodb.net/Crypto-coin", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



 app.use('/', route);

 app.use( (req ,res) => {
    res.status(404).send({status : false , message :`Page Not Found , Given URL ${req.url} is incorrect for this application.`})
})


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});