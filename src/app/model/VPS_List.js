const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const VPSs = new Schema(
  {
    name: { type: String, require: true },
    desc: { type: String },
    image: { type: String },
    CPU: { type: String, require: true },
    memory: { type: String, require: true },
    diskSSD: { type: String, require: true },
    local: { type: String, require: true },
    slug: { type: String, slug: "name", unique: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  overrideMethods: "all",
  deletedAt: true,
});

module.exports = mongoose.model("VPSs", VPSs);
