const Category = require('../models/Category')
const router = require('express').Router()


// create category
router.post('/createCategory', async (req, res) => {
    //new category that is to be created
    const newCategory = new Category({...req.body, name: req.body.name.toLowerCase()})
    try {
        // check if this category already exists
        const oldCategory = await Category.findOne({name: req.body.name.toLowerCase()})
        if(oldCategory) //if already exist
        {
            res.status(400).json("Category Already Exists!!")
        }
        else
        {
            // save the created category and return it
            const savedCategory = await newCategory.save()
            res.status(200).json(savedCategory)
        }
    } catch (error) { 
        res.status(500).json(error.message)
    }
})


// get all categories
router.get('/getAllCategories', async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


// get a category by id, when id is passed as params
router.get('/getCategoryById/:id', async (req, res) => {
    try {
        const categoryId = req.params.id
        const category = await Category.findById(categoryId)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


// get a category by name or id, when name or id are passed as query
router.get('/getCategoryByNameOrId', async (req, res) => {
    try {
        const categoryName = req.query.name ? req.query.name.toLowerCase() : ""
        const categoryId = req.query.id

        let category
        if(categoryId) category = await Category.findById(categoryId)
        else if(categoryName) category = await Category.findOne({name: categoryName})

        res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


// edit category attributes
router.put('/editCategory/:id', async (req, res) => {
    try {
        const categoryId = req.params.id //id of the category to be editted
        const newCategory = {...req.body, name: req.body.name?.toLowerCase()} // attributes to be updated

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
            $set: newCategory
        },{new: true})

        res.status(200).json(updatedCategory)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router