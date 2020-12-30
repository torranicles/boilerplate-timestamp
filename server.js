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


// your first API endpoint... 
app.get("/api/timestamp/:date", (req, res) => {
  let inputDate = req.params.date;
  const digits = /^\d{5,}/;
  if (digits.test(inputDate)) {
    const intDate = parseInt(inputDate);
    res.json({
      unix : intDate,
      utc: new Date(intDate).toUTCString()
    })
  } else {
    let dateObj = new Date(inputDate);
    console.log(dateObj);
    if (dateObj.toString() !== "Invalid date") {
      res.json({
        unix: dateObj,
        utc: dateObj.toUTCString()
      })
    } else {
      res.json({
        error: "Invalid date"
      })
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
