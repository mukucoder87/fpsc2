const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  const formData = req.body;

  const response = await fetch("https://api.github.com/repos/mukucoder87/fpsc2/actions/workflows/main.yml/dispatches", {
    method: "POST",
    headers: {
      Authorization: `token ${process.env.SCORECARD}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ref: "main",
      inputs: {
        submission: JSON.stringify(formData)
      }
    })
  });

  const result = await response.text();
  res.status(response.status).send(result);
});

app.listen(3000, () => {
  console.log("✅ Backend running at http://localhost:3000");
});
