const jobs = require("../data/jobs.json");
const categories = require("../data/categories.json");
const companies = require("../data/companies.json");
class HomeController {
  static get(req, res, next) {
    res.render("index", {
      jobs: jobs,
      categories: categories,
      companies: companies
    });
  }
}

module.exports = HomeController;
