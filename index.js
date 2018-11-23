const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8080;

app.use(
  "/public",
  express.static(path.join(__dirname, "application", "public"))
);

// app start
app.listen(PORT, () => {
  console.log("Node Server running on port " + PORT);
});
