const jobs = require("../data/jobs.json");
const categories = require("../data/categories.json");
class HomeController {
  static get(req, res, next) {
    res.render("index", { jobs: jobs, categories: categories });
  }
}

module.exports = HomeController;
