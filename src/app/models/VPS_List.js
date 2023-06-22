const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const VPSs = new Schema(
  {
    name: { type: String, require: true },
    desc: { type: String },
    image: { type: String },
    Donvi: { type: String },
    CPU: { type: String, require: true },
    memory: { type: String, require: true },
    ssd: { type: String, require: true },
    price: { type: String, require: true },
    local: { type: String, require: true },
    vps: [
      {
        id: { type: mongoose.ObjectId },
        ip: { type: String, unique: true },
        port: { type: String },
        user: { type: String },
        password: { type: String },
      },
    ],
    slug: { type: String, slug: "name", unique: true },
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

module.exports = mongoose.model("VPSs", VPSs);
