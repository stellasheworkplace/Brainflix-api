const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");


router.route("/").get((req, res) => {
    const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    res.send(videos);
})


router.route("/:id").get((req, res) => {
    const params = req.params;

    const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    const selectedVideo = videos.find((video) => video.id === params.id);
    if (selectedVideo) {
        res.send(JSON.stringify(selectedVideo));
    } else {
        res.status(400).send("video not found");
    }
});

router.route("/").post((req, res) => {
    const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: "Aiden Thompson",
        image: "image0.jpg",
        description: req.body.description,
        views: "980,544",
        likes: "22,479",
        duration: "4:01",
        video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: [],
    };

    videos.push(newVideo);

    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    res.send("Video Uploaded Successful!");
});


module.exports = router;