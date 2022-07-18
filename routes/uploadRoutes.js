const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");

// upload image to cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// only admin upload Image

router.post("/upload", (req, res) => {
  try {
    // console.log(req.files);
    if (!req.files || Object.keys(req.files).lenght === 0)
      return res.status(400).json({ msg: "No files were uploaded" });

    const file = req.files.file;
    if (file.size > 1024 * 1024 * 5) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File Size too large" });
    }

    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg"
    ) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "File type not supported" });
    }
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "Ad-pics" },
      async (err, result) => {
        if (err) throw err;

        removeTmp(file.tempFilePath);

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post("/destroy",  (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) res.status(400).json({ msg: "No image selected" });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: "Deleted images" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
