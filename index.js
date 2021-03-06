require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const JSON_PATH = path.join(__dirname,"data","paintings.json");
const PORT = process.env.PORT;
const HOST = process.env.HOST;

let paintings = [];

function readPaintings(path) {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.warn(`Failed to read paintings JSON file ${jsonPath}`);
      console.warn(err);
    } else {
      paintings = JSON.parse(data);
    }
  });
}

readPaintings(JSON_PATH);

app.use(express.static('static'));

// return all paintings
app.get("/", (req, res) => {
  console.log(`Returning all paintings`);
  res.json(paintings);
});

// return single painting
app.get("/:id", (req, res) => {
  let resPaintings = paintings.filter(p => {
    return p.paintingID == req.params.id;
  });

  if (resPaintings && resPaintings.length > 0) {
    console.log(`Returning paintings by ID ${req.params.id}`);
    res.json(resPaintings[0]);
  } else {
    res.send(`No paintings found by ID ${req.params.id}`);
    console.log(`No paintings found by ID ${req.params.id}`);
  }
});

// return all paintings in gallery
app.get("/gallery/:id", (req, res) => {
  let resPaintings = paintings.filter(p => {
    return p.gallery.galleryID == req.params.id;
  });

  if (resPaintings && resPaintings.length > 0) {
    console.log(`Returning paintings in Gallery with ID ${req.params.id}`);
    res.json(resPaintings);
  } else {
    res.send(`No paintings found in Gallery with ID ${req.params.id}`);
    console.log(`No paintings found in Gallery with ID ${req.params.id}`);
  }
});

// all paintings between min and max years
app.get("/year/:min/:max", (req, res) => {
  let resPaintings = paintings.filter(p => {
    return p.yearOfWork <= req.params.max &&
           p.yearOfWork >= req.params.min;
  });

  if (resPaintings && resPaintings.length > 0) {
    console.log(`Returning paintings between years ${req.params.min}-${req.params.max}`);
    res.json(resPaintings[0]);
  } else {
    res.send(`No paintings found between years ${req.params.min}-${req.params.max}`);
    console.log(`No paintings found between years ${req.params.min}-${req.params.max}`);
  }
});

app.listen(PORT, 'localhost', `Listening on ${PORT}`);
console.log(`Listening on ${HOST}:${PORT}`);
