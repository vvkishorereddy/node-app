const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();

const HomeRoutes = require("./application/routes/HomeRoute");
const JobsRoutes = require("./application/routes/JobsRoute");

// variables
const PORT = process.env.PORT || 8080;

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "application", "views", "layouts"),
    partialsDir: [path.join(__dirname, "application", "views", "partials")]
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "application", "views"));

app.use(
  "/public",
  express.static(path.join(__dirname, "application", "public"))
);
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// routes
app.use("/jobs", JobsRoutes);
app.use(HomeRoutes);

// app start
app.listen(PORT, () => {
  console.log("Node Server running on port " + PORT);
});
