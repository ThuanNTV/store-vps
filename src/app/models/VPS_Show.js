const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const VPSShow = new Schema(
  {
    name: { type: String, require: true },
    img: { typeL: String },
    desc: { typeL: String },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);
VPSs.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("VPSShow", VPSShow);
