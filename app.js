const express= require("express");
const bodyParser =require("body-parser");
const request=require("request");
const https=require("https");
const { dirname } = require("path");


const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
})


app.post("/",function(req,res){
    const firstName=req.body.first;
    

    const lastName=req.body.middle;
    const emailID=req.body.last;
   const PhoneNo=req.body.number;

    

    const data={
        members:[{

            email_address:emailID,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName,
               PHONE:PhoneNo
        
            }
        }]

        }
        const jsonData=JSON.stringify(data);
    const url= "https://us10.api.mailchimp.com/3.0/lists/75c4e302bf";
    const options ={
           method:"POST",
           auth:"sudhchaur:a0bc2d36578e24cf95449add4c10a206-us10"
    }
    const reque=https.request(url,options,function(response){

if(response.statusCode===200){
    res.sendFile(__dirname +("/success.html"));
}else {
    res.sendFile(__dirname +("/failure.html"));
}


        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    reque.write(jsonData);
    reque.end();
        
    
})

    

   




app.listen(3000,function(){
    console.log("server is running on port 3000");
})

// clint id  75c4e302bf.
//API key  a0bc2d36578e24cf95449add4c10a206-us10
// https://us19.admin.mailchimp.com/
