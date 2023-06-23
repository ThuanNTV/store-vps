const VPSs = require("../models/VPS_List");
const {
  multiplesMongooseToObject: multiplesMongooseToObject,
  mongooseToObject,
} = require("../../utils/mongoose");

class VPSController {
  show(req, res, next) {
    VPSs.findOne({ slug: req.params.slug })
      .then((VPS) =>
        res.render("VPS/show", {
          course: mongooseToObject(VPS),
        })
      )
      .catch(next);
  }

  // [GET] /vps/create
  create(req, res, next) {
    res.render("VPS/createVPS");
  }
  // [GET] /vps/show-List
  showList(req, res, next) {
    let vpsQuery = VPSs.find({});

    Promise.all([vpsQuery, VPSs.countDocumentsDeleted()]).then(
      ([vps, deletedCount]) =>
        res.render("VPS/VPSs", {
          deletedCount,
          vps: multiplesMongooseToObject(vps),
        })
    );
  }

  // [POST] /vps/lib
  lib(req, res, next) {
    const vps = new VPSs(req.body);
    vps
      .save()
      .then(() => res.redirect("/vps/show-List"))
      .catch((error) => {});
  }

  // [PUT] /vps/add-new-vps/:id?_method=PUT
  addNewVPS(req, res, next) {
    VPSs.findByIdAndUpdate({ _id: req.params.id }, { $push: { vps: req.body } })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [GET] /vps/show-List/:id
  showListVPS_Id(req, res, next) {
    VPSs.findById(req.params.id)
      .then((vps) =>
        res.render("VPS/vps", {
          vps: mongooseToObject(vps),
          vpsId: mongooseToObject(vps)._id.toString(),
        })
      )
      .catch(next);
  }

  // TODO: continue
  // [GET] /vps/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("VPS/edit", {
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
    VPSs.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  deleteVPS(req, res, next) {
    VPSs.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { vps: req.body.id } }
    )
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
