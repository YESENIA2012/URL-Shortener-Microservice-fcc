require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const url = req.body.url;

  if (!url.includes("https://") && !url.includes("http://")) {
    return res.json({ error: "invalid url" });
  } else {
    next();
  }
});

const arrayUrls = [];
const counterUrl = [];

app.post("/api/shorturl", (req, res) => {
  const url = req.body.url;

  if (url === "http://localhost:3000/api/shorturl/</short_url>") {
    return res.redirect("/");
  }

  res.json({ original_url: url, short_url: 1 });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
