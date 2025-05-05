const express=require("express");
const { tr } = require("framer-motion/client");
const mongoose=require("mongoose");
const app=express();

const port=3003;

const url="mongodb://localhost:27017/music";


mongoose.connect(url

).then(console.log("Db connected")
).catch(err=>{console.error("Error connecting ",error)});

const songschema=new mongoose.Schema(
    {
       Songname:String,
       Film:String,
       Music_Director:String,
       Singer:String,
       Actor:String,
       Actress:String 
    }  
);


const Song =mongoose.model("Song",songschema);

app.use(express.json());
app.use(express.static("public"));

app.put("/api/songs/insert",async(req,res)=>{

    try {
        
        const songs=[
            {
                Songname: "Tum Hi Ho",
                Film: "Aashiqui 2",
                Music_director: "Mithoon",
                Singer: "Arijit Singh",
              },
              {
                Songname: "Gerua",
                Film: "Dilwale",
                Music_director: "Pritam",
                Singer: "Arijit Singh",
              },
              {
                Songname: "Kal Ho Naa Ho",
                Film: "Kal Ho Naa Ho",
                Music_director: "Shankar-Ehsaan-Loy",
                Singer: "Sonu Nigam",
              },
              {
                Songname: "Zara Zara",
                Film: "Rehnaa Hai Terre Dil Mein",
                Music_director: "Harris Jayaraj",
                Singer: "Bombay Jayashri",
              },
              {
                Songname: "Channa Mereya",
                Film: "Ae Dil Hai Mushkil",
                Music_director: "Pritam",
                Singer: "Arijit Singh",
              },
        ];

        const result=await Song.insertMany(songs);
        res.json({InsertedCount:result.length})
    } catch (error) {
        res.status(500).json( {error: "Error inserting songs"})
    }
});


app.get("/api/songs",async(req,res)=>
{try {
    const count=await Song.countDocuments();
    const songs=await Song.find({});
    res.json({count:count,songs:songs});
} catch (error) {
    console.error("Error",error);
}
    
});

app.get("/api/songs/music-director/:director",async(req,res)=>
{   

    try {
        const param=req.params.director;
        const songs=await Song.find({Music_Director:param});
        res.json(songs); 
    } catch (err) {
        res.status(500).json({error: err.message});
    }
         
});
app.get("/api/songs/music-director/:director/singer/:singer",async(req,res)=>
    {   
    
        try {
            const {director,singer}=req.params;
            const songs=await Song.find({Music_Director:director,Singer:singer});
            res.json(songs); 
        } catch (err) {
            res.status(500).json({error: err.message});
        }
             
    });

 app.delete("/api/song/delete/:songname",async(req,res)=>{
     const songname=req.params.songname;
     const result=await Song.deleteOne({Songname:songname})
     res.json({deletedcount:result.deletedCount});
 });
 
 app.post("/api/songs/add",async(req,res)=>
    {   
    
        try {
            const song=new Song(req.body);
            const result= await song.save();
            res.json({insertedId:result._id});
        } catch (err) {
            res.status(500).json({error: err.message});
        }
             
    });

    app.get("/api/songs/singer/:singer/film/:film",async(req,res)=>
        {   
        
            try {
                const {singer,film}=req.params;
                const songs=await Song.find({Singer:singer,Film:film});
                res.json(songs); 
            } catch (err) {
                res.status(500).json({error: err.message});
            }
                 
        });
        app.put("/api/songs/:songname",async(req,res)=>
            {   
            
                try {
                   const songname=req.params.songname;
                    const { Actor, Actress } = req.body;
                   const result = await Song.updateOne(
                       { Song: songname },
                       { $set: { Actor, Actress } }
                   );
                   res.json({modifiedcount:result.nModified});
                } catch (err) {
                    res.status(500).json({error: err.message});
                }
                     
            });


            app.listen(port,()=>
            {
                console.log(`http://localhost:${port}`);
            });