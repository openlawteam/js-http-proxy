const express = require("express");
const request = require("request");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send({ status: "OK" });
});

app.get("/fetch", (req, res) => {
  console.log(`/fetch ${req.query.url}`);
  request(
    { url: req.query.url, followAllRedirects: true },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).send("error");
      }
      res.send(body);
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
