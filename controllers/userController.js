const collection = require("../config/collection");
const db = require("../config/connection");
const { ObjectId } = require("mongodb");

module.exports = {
  createArticle: async (req, res) => {
    const { heading, readTime, description, categories } = req.body;

    try {
      let article = await db
        .get()
        .collection(collection.ARTICLE_COLLECTION)
        .insertOne({
          heading,
          readTime,
          description,
          categories,
          verified: false,
          new: true,
          trending: false,
        });
      res.status(200).json({ article, msg: "article Added" });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },
  getAllArticle: async (req, res) => {
    try {
      let allArticle = await db
        .get()
        .collection(collection.ARTICLE_COLLECTION)
        .find()
        .toArray();
      res.status(200).json({ allArticle, msg: "All Articles" });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },
  editArticle: async (req, res) => {
    const { heading, readTime, description, categories } = req.body;
    let { id } = req.params;
    try {
      db.get()
        .collection(collection.ARTICLE_COLLECTION)
        .update(
          { _id: ObjectId(id) },
          { $set: { heading, readTime, description, categories } }
        );
      res.status(200).json({ msg: "updated" });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },
  removeArticle: async (req, res) => {
    let { id } = req.params;
    try {
      await db
        .get()
        .collection(collection.ARTICLE_COLLECTION)
        .deleteOne({ _id: ObjectId(id) });
      res.status(200).json({ msg: "Removed" });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },
  createCategory: async (req, res) => {
    console.log(req.body);
    const { categoryName } = req.body;
    try {
      await db
        .get()
        .collection(collection.CATEGORY_COLLECTION)
        .insertOne({ categoryName });
      let categories = await db
        .get()
        .collection(collection.CATEGORY_COLLECTION)
        .find()
        .toArray();
      res.status(200).json({ categories, msg: "insert" });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  },
  listcategory: async (req, res) => {
    let category = req.body.categories;
    console.log(category);
    try {
      let b = await db
        .get()
        .collection(collection.ARTICLE_COLLECTION)
        .aggregate([
          {
            $project: {
              heading: 1,
              description: 1,
              hasCategories: {
                $in: [...category, "$categories"],
              },
            },
          },
          {
            $match: { hasCategories: true },
          },
        ])
        .toArray();
      
      res.status(200).json({ b, msg: "matched" });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  }
  
};