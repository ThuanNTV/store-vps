class HomeController {
  index(req, res, next) {
    res.render("home", {
      title: "Home",
      message: "Welcome to my website!",
      partialView: "lienhe.hbs",
    });
  }
}

module.exports = new HomeController();
