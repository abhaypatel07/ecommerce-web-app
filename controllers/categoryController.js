import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//create controller
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category is already exist",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "New category created..",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category..",
    });
  }
};

//update category controller
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body; // navu name j 6 aa
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true } //update thay category valu etle aa lakhyu
    );
    res.status(200).send({
      success: true,
      message: "category update successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while update in category..",
    });
  }
};

//get category contoller
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All categories..",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).seng({
      success: false,
      error,
      message: "Error while get all category",
    });
  }
};

//single category controller
export const singleCategoryController = async (req, res) => {
  try {
    // const {slug} = req.params;
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "get single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).seng({
      success: false,
      error,
      message: "Error while get single category",
    });
  }
};

//for delete catagory
export const deleteCategoryController = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "catagory deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).seng({
      success: false,
      error,
      message: "Error while deleting category",
    });
  }
};
