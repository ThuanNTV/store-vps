const VPSs = require("../models/VPS_List");
const {
  multiplesMongooseToObject: multiplesMongooseToObject,
  mongooseToObject,
} = require("../../utils/mongoose");

class VPSController {
  show(req, res, next) {
    Vps.findOne({ slug: req.params.slug })
      .then(
        (VPS) =>
          res.render("VPS/show", {
            course: mongooseToObject(VPS),
          }),
        console.log(VPS)
      )
      .catch(next);
  }

  // [GET]
  create(req, res, next) {
    res.render("VPS/createVPS");
  }

  // [POST]
  lib(req, res, next) {
    // console.log(res.json(req.body));
    const vps = new VPSs(req.body);
    vps
      .save()
      //   .then(() => res.redirect("/me/stored/courses"))
      .then(() => console.log(res.json(req.body)))
      .catch((error) => {});
  }

  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }

  update(req, res, next) {
    const formData = req.body;
    Course.updateOne({ _id: req.params.id }, formData)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // /courses/64883f545dcb45dc24383c98/restore TODO:restore not working
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action is invalid" });
    }
  }
}

module.exports = new VPSController();
