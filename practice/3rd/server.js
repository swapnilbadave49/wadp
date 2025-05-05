const fs=require('fs');
const express=require('express');

const app=express();
const PORT=3001;

app.use(express.static('public'));


app.get('/api/products',(req,res)=>{
    fs.readFile("products.json","utf8",(err,data)=>
    {
        if(err)
        {
            return res.status(500).json({error:"Wrong"});
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT,()=>
{
    console.log(`http://localhost:${PORT}`);
});