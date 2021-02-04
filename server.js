// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// helper function to return obj with unix time and utc date
const getTimestamp = date => ({
    unix: date.getTime(),
    utc: date.toUTCString()
});


//if no date is provided, return date now
app.get('/api/timestamp',(req,res)=>{
    let timestamp = getTimestamp(new Date());
      res.json(timestamp);
});

app.get('/api/timestamp/:date?',(req,res) => {
 
 //if date is a number (i.e. unix timestamp) parse it to integer and create a date from it, otherwise create a date from the NaN date format
 const date = !isNaN(req.params.date) ?
            new Date(parseInt(req.params.date)) :
            new Date(req.params.date)

// if .getTime doesn't return a number, the date is invalid 
  if (!isNaN(date.getTime())) {
            timestamp = getTimestamp(date);
        } else {
            timestamp = {
                error: "invalid date"
            }}    

      res.json(timestamp);

  
  
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
