import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  users.push({ username, avatar });
  console.log(users);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  const realUser = users.find((user) => user.username === username);

  if (!realUser) {
    return res.send("UNAUTHORIZED");
  }

  tweets.push({ username, tweet });
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  const lastTenTweets = tweets.slice(-10).map((tweet) => {
    const user = users.find((u) => u.username === tweet.username);
    return { ...tweet, avatar: user.avatar };
  });
  res.send(lastTenTweets);
});

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
