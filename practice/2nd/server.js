const { error } = require("console");
const express=require("express");
const PORT=3001;
const app=express();
const fs=require("fs");

app.use(express.static("public"));

app.get("/api/users",(req,res)=>{

    fs.readFile("users.json","utf8",(err,data)=>
    {
        if(err)
            {
                return res.status(500).json({error:"Failed to  get"});
            }
         res.json(JSON.parse(data));   
    });
});


app.listen(PORT,()=>
{
    console.log(`app listening on port: http://localhost:${PORT}`);
})