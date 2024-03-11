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

    const {
        title,
        image,
        description
    } = req.body;

    const newVideo = {
        id: vvidv4(),
        title,
        description,
        image,
        channel: "XXX",
        views: 0,
        likes: 0,
        duration: "00:00",
        video:"",
        timestamp: Date.now(),
        comments:[]
    };

    videos.push(newVideo);

    fs.writeFileSync("./data/videos.json", JSON.stringify(videos,null,2));
    res.send("Video Uploaded Successful!");
});


module.exports = router;