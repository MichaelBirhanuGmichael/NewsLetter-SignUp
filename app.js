const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (res, req) {
  const fname = res.body.firstname;
  const lname = res.body.lastname;
  const email = res.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/1717429747";
  const options = {
    method: "POST",
    auth: "michael1:c2bc348a4ec8fc8018d1b9a527babefd-us21",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      req.sendFile(__dirname + "/succsses.html");
    } else {
      req.sendFile(__dirname + "/failure.html");
    }
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.post("/goback",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT|3000, function () {
  console.log("server is running on port 3000.");
});


