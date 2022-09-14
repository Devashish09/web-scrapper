const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const url = "https://www.theguardian.com/uk";

app.get("/", function (req, res) {
  res.json("This is my webscraper");
}); //get data

app.get("/results", (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const a = cheerio.load(html);
      const articles = [];

      a(".fc-item__title", html).each(function () {
        const title = a(this).text();
        const url = a(this).find("a").attr("href");

        articles.push({
          title,
          url,
        });
      });

      //   console.log(articles);
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

//app.post(); //add
//app.put(); //edit
//app.delete(); //delete data

app.listen(PORT, () => console.log(`server running to PORT ${PORT}`));
