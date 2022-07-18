const Products = require("../models/productsModel");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);

    queryString = queryString.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryString));

    return this;
  }
}

const productController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIFeatures(Products.find(), req.query).filtering();
      const products = await features.query;

      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProducts: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        city,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images)
        return res.status(400).json({ msg: "No image was selected" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "Thiss product already exist" });

      const newProduct = new Products({
        product_id,
        title: title.toUpperCase(),
        price,
        city,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      res.json({ newProduct, msg: "Product AD created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProducts: async (req, res) => {
    try {
      await Products.findByIdAndDelete();
      res.json({ msg: "Deleted An AD" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProducts: async (req, res) => {
    try {
      const { title, price, city, description, content, images, category } =
        req.body;

      if (!images)
        return res.status(400).json({ msg: "No images are uploaded" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toUpperCase(),
          price,
          city,
          description,
          content,
          images,
          category,
        }
      );

      res.json({ msg: "updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productController;
