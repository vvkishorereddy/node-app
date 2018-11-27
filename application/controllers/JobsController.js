const jobs = require("../data/jobs.json");

class JobsController {
  static get(req, res, next) {
    res.render("jobs/index");
  }
}

module.exports = JobsController;
