const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { send } = require("process");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("xx"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
});
app.post("/",(req,res)=>{
    const firstName=req.body.Fname;
    const lastName=req.body.Lname;
    const email=req.body.email;
    var data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    var jsonData=JSON.stringify(data);
    const url="https://us22.api.mailchimp.com/3.0/lists/2cddb3bd88";
    const options={
        method:"POST",
        auth:"prvnX:1cdffd3524a211e797b50fe5278a6fdd-us22"
    };
    const request=https.request(url,options,(response)=>{
        console.log(response.statusCode);
        if (response.statusCode===200) {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",(data)=>{
            //console.log(JSON.parse(data));
            });
        });
    request.write(jsonData);
    request.end();

});
app.post("/failure",(req,res)=>{
    res.redirect("/");
});

app.listen(3000,()=>{
    console.log("Server has started");
});

//mailchimp api 1cdffd3524a211e797b50fe5278a6fdd-us22
//audience id 2cddb3bd88