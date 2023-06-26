import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;
const users = [];
const tweets = [];

app.use(cors());
app.use(express.json());

app.post("/sign-up", function(req, res) {
  const username = req.body.username;
  const avatar = req.body.avatar;

  if (!username || !avatar || typeof username !== "string" || typeof avatar !== "string") {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  users.push({ username: username, avatar: avatar });
  res.status(201).send("OK");
});

app.post("/tweets", function(req, res) {
  const username = req.body.username;
  const tweet = req.body.tweet;

  if (!username || !tweet || typeof username !== "string" || typeof tweet !== "string") {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  const realUser = users.find(function(user) {
    return user.username === username;
  });

  if (!realUser) {
    return res.status(401).send("UNAUTHORIZED");
  }

  tweets.push({ username: username, tweet: tweet });
  res.status(201).send("OK");
});

app.get("/tweets", function(req, res) {
  const lastTenTweets = tweets.slice(-10).map(function(tweet) {
    const user = users.find(function(u) {
      return u.username === tweet.username;
    });
    return Object.assign({}, tweet, { avatar: user.avatar });
  });
  res.send(lastTenTweets);
});

app.listen(PORT, function() {
  console.log("Rodando na porta " + PORT);
});
