const Category = require('../models/Category')
const Subcategory = require('../models/Subcategory')
const router = require('express').Router()


// create subcategory
router.post('/createSubcategory', async (req, res) => {
    try {
        // details of the category in which this subcategory is to be stored
        const categoryDetails = await Category.findOne({name: req.body.categoryName.toLowerCase()})
        if(!categoryDetails) res.status(400).json("Category Not found!!") //if given category not found

        const newSubcategory = new Subcategory({
            name: req.body.name.toLowerCase(), 
            image: req.body.image,
            description: req.body.description,
            taxApplicability: categoryDetails.taxApplicability, // default taxApplicability is same as that of category
            tax: categoryDetails.tax, // default tax is same as that of category
            categoryId: categoryDetails._id,
        })

        // check if this subcategory already exists
        const oldSubcategory = await Subcategory.findOne({name: req.body.name.toLowerCase()})
        if(oldSubcategory) //if already exist
        {
            res.status(400).json("SubCategory Already Exists!!")
        }
        else
        {
            // save the created subcategory and return it
            const savedSubcategory = await newSubcategory.save()

            // update the subcategories array of the category
            const newSubcategoriesArrray = [...categoryDetails.subCategories, savedSubcategory._id]
            await Category.findByIdAndUpdate(categoryDetails._id, {
                $set: {subCategories: newSubcategoriesArrray}
            },{new: true})

            res.status(200).json(savedSubcategory) // return the created subcategory
        }
    } catch (error) { 
        res.status(500).json(error.message)
    }
})


// get all subcategories
router.get('/getAllSubcategories', async (req, res) => {
    try {
        const subcategories = await Subcategory.find()
        res.status(200).json(subcategories)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


// get all subcategories under a category, category is passed as params
router.get('/getSubcategoriesOfCategory/:category', async (req, res) => {
    try {
        //find the details of the specified category
        const categoryName = req.params.category.toLowerCase()
        const categoryDetails = await Category.findOne({name: categoryName})
        if(!categoryDetails) res.status(400).json("Category Not found!!") // if category does not exist

        // get the details of the subcategories whose ids are in the subcategories array of the category
        const subcats = categoryDetails.subCategories // subcategory array of the category
        const subcategoryDetails = await Subcategory.find({
            _id: { $in: subcats }
        })

        res.status(200).json(subcategoryDetails) // return the subcategories
    } catch (error) {
        res.status(500).json(error.message)
    }
})


// get a subcategory by name or id, when name or id are passed as query
router.get('/getSubcategoryByNameOrId', async (req, res) => {
    try {
        const subcategoryName = req.query.name ? req.query.name.toLowerCase() : ""
        const subcategoryId = req.query.id

        let subcategory
        if(subcategoryId) subcategory = await Subcategory.findById(subcategoryId)
        else if(subcategoryName) subcategory = await Subcategory.findOne({name: subcategoryName})

        res.status(200).json(subcategory)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


// edit subcategory attributes
router.put('/editSubcategory/:id', async (req, res) => {
    try {
        const subcategoryId = req.params.id // id of the subcategory to be editted

        const oldSubCategory = await Subcategory.findById(subcategoryId) // details of the subcategory before update
        let newSubcategory
        if(req.body.categoryName) // if req.body contains categoryName, ie, user wants to change the category under which this subcategory exists
        {
            //new category details
            const categoryDetails = await Category.findOne({name: req.body.categoryName.toLowerCase()})
            if(!categoryDetails) res.status(400).json("Category Not found!!") // if new category does not exist

            // if the old category and the new category to update are not same
            if(oldSubCategory.categoryId.toString() !== categoryDetails._id.toString())
            {
                // add the subcategory into the new category to be updated
                const newSubcategoriesArrray = [...categoryDetails.subCategories, subcategoryId]
                await Category.findByIdAndUpdate(categoryDetails._id, {
                    $set: {subCategories: newSubcategoriesArrray}
                },{new: true}) 
    
                // remove the subcategory from the previous category
                const oldCategoryDetails = await Category.findById(oldSubCategory.categoryId) // details of the old category
                const newArray = oldCategoryDetails.subCategories.filter(item => item.toString() !== subcategoryId.toString())
                await Category.findByIdAndUpdate(oldCategoryDetails._id, {
                    $set: {subCategories: newArray}
                },{new: true}) 
    
                // updated subcategory
                newSubcategory = {
                    name: req.body.name?.toLowerCase(), 
                    image: req.body.image,
                    description: req.body.description,
                    taxApplicability: categoryDetails.taxApplicability,
                    tax: categoryDetails.tax, 
                    categoryId: categoryDetails._id,
                }
            }
            else // if the old category and the new category to update are same
            {
                newSubcategory = {...req.body, name: req.body.name?.toLowerCase()} // updated subcategory
            }
        }
        else // if req.body does not contain categoryName
        {
            newSubcategory = {...req.body, name: req.body.name?.toLowerCase()} // updated subcategory
        }

        // update the subcategory
        const updatedSubcategory = await Subcategory.findByIdAndUpdate(subcategoryId, {
            $set: newSubcategory
        },{new: true})

        res.status(200).json(updatedSubcategory) // return the updated subcategory
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router
