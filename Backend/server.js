const express = require("express");
const fetch = require("node-fetch"); // Ensure node-fetch is installed: npm install node-fetch
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors()); // Allows all origins; adjust as needed for production
app.use(express.json());

app.post("/submit", async (req, res) => {
  const formData = req.body;
  console.log("Received submission:", formData); // Debug: Log incoming submission

  try {
    // Dispatch workflow with GitHub Actions
    const githubResponse = await fetch("https://api.github.com/repos/mukucoder87/fpsc2/actions/workflows/main.yml/dispatches", {
      method: "POST",
      headers: {
        "Authorization": `token ${process.env.SCORECARD}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          submission: JSON.stringify(formData)
        }
      })
    });

    const resultText = await githubResponse.text();
    console.log("GitHub response:", resultText);
    res.status(githubResponse.status).send(resultText);
  } catch (error) {
    console.error("Error while dispatching workflow:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("✅ Backend running at http://localhost:3000");
});
