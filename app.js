const express = require('express');
const https = require('https');
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get('/', function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    var data = {
      members: [
          {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName,
              }
          }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/bc5b31a39e";
    const options = {
        method: "POST",
        auth: "Kashish1:2083a776280d2054fb99058ce0218228-us5",
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});


app.post('/failure', function(req,res){
    res.redirect('/');
})


app.listen(process.env.PORT || 3000, function(){
  console.log("listening");
});

//API key
//2083a776280d2054fb99058ce0218228-us5
//list key
//bc5b31a39e.