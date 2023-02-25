require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const arrayUrls = [];
const shortUrl = [];

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.use(express.urlencoded({ extended: false }));

app.get("/api/shorturl/:short_url", (req, res) => {
  const numberUrlShort = parseInt(req.params.short_url);

  if (shortUrl.includes(numberUrlShort)) {
    return res.redirect(arrayUrls[numberUrlShort]);
  }

  res.json({ error: "Does not exist" });
});

app.post("/api/shorturl", (req, res, next) => {
  const url = req.body.url;

  if (!url.includes("https://") && !url.includes("http://")) {
    return res.json({ error: "invalid url" });
  } else {
    arrayUrls.push(url);
    shortUrl.push(arrayUrls.length);
    res.json({ original_url: url, short_url: shortUrl.length - 1 });
    next();
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
