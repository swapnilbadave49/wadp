const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 3003;

const url =
  "mongodb://localhost:27017/music";
   
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const songSchema = new mongoose.Schema({
  Songname: String,
  Film: String,
  Music_director: String,
  Singer: String,
  Actor: String,
  Actress: String,
});

const Song = mongoose.model("Song", songSchema);

app.use(express.json());
app.use(express.static("public"))

app.post("/api/songs/insert", async (req, res) => {
  try {
    const songs = [
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
    const result = await Song.insertMany(songs);
   
    res.json({
      insertedCount: result.length,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error inserting songs",
    });
  }
});

app.get("/api/songs", async (req, res) => {
  try {
    const count = await Song.countDocuments();
    const songs = await Song.find({});
    res.json({
      count: count,
      songs: songs,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error fetching songs",
    });
  }
});

app.get("/api/songs/music-director/:director", async (req, res) => {
  try {
    const director = req.params.director;
    const songs = await Song.find({ Music_director: director });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get(
  "/api/songs/music-director/:director/singer/:singer",
  async (req, res) => {
    const { director, singer } = req.params;
    const songs = await Song.find({
      Music_director: director,
      Singer: singer,
    });
    res.json(songs);
  }
);

app.delete("/api/songs/delete/:songname", async (req, res) => {
  try {
    const songname = req.params.songname;
    const result = await Song.deleteOne({ Songname: songname });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/songs/add", async (req, res) => {
  try {
    const song = new Song(req.body);
    const result = await song.save();
    res.json({ insertedId: result._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/songs/singer/:singer/film/:film", async (req, res) => {
  try {
    const { singer, film } = req.params;
    const songs = await Song.find({ Singer: singer, Film: film });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/songs/update/:songname", async (req, res) => {
  try {
    const songname = req.params.songname;
    const { Actor, Actress } = req.body;
    const result = await Song.updateOne(
      { Songname: songname },
      { $set: { Actor, Actress } }
    );
    res.json({ modifiedCount: result.nModified });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
