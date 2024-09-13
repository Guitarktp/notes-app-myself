import app from "./app.js";

const PORT = process.env.PORT || 5000;


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});

// server connection test
app.get("/", (req, res) => {
  res.json({ data: "respond received from the server!" });
});