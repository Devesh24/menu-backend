const Category = require('../models/Category')
const Item = require('../models/Item')
const Subcategory = require('../models/Subcategory')
const router = require('express').Router()


// craete item
router.post('/createItem', async (req, res) => {
    try {
        // if neither categoryName nor subcategoryName is specified by the user
        if(!req.body.categoryName && !req.body.subcategoryName)
        {
            res.status(400).json("Enter CategoryName or SubCategoryName")
        }

        // new item to be added
        let item =  new Item({
            name: req.body.name.toLowerCase(),
            image: req.body.image,
            description: req.body.description,
            taxApplicability: req.body.taxApplicability,
            tax: req.body.tax,
            baseAmount: req.body.baseAmount,
            discount: req.body.discount,
            totalAmount: req.body.discount ? req.body.baseAmount - req.body.discount : req.body.baseAmount,
        })

        let category, subcategory
        if(req.body.categoryName) // if the user provide categoryName, ie, the item belongs to a category
        {
            // details of the category in which this item is to be stored
            category = await Category.findOne({name: req.body.categoryName.toLowerCase()})
            if(!category) res.status(400).json("Category Not found!!") // if category does not exists

            item.categoryId = category._id 
        }
        if(req.body.subcategoryName) // if the user provide subcategoryName, ie, the item belongs to a subcategory
        {
            // details of the subcategory in which this item is to be stored
            subcategory = await Subcategory.findOne({name: req.body.subcategoryName.toLowerCase()})
            if(!subcategory) res.status(400).json("Sub Category Not found!!") // if subcategory does not exist

            item.subcategoryId = subcategory._id
        }

        // check if this item already exists
        const oldItem = await Item.findOne({name: req.body.name.toLowerCase()})
        if(oldItem) //if already exists
        {
            res.status(400).json("Item Already Exists!!")
        }
        else
        {
            // save the created item and return it
            const createdItem = await item.save()
            if(req.body.categoryName) // update the items array of the category, if categoryName is provided
            {
                const newItemsArray = [...category.items, createdItem._id]
                await Category.findByIdAndUpdate(category._id, {
                    $set: {items: newItemsArray}
                },{new: true})
            }
            if(req.body.subcategoryName) // update the items array of the subcategory, if subcategoryName is provided
            {
                const newItemsArray = [...subcategory.items, createdItem._id]
                await Subcategory.findByIdAndUpdate(subcategory._id, {
                    $set: {items: newItemsArray}
                },{new: true})
            }

            res.status(200).json(createdItem) //return the newly created item
        }
    } catch (error) { 
        res.status(500).json(error.message)
    }
})


// get all items
router.get('/getAllItems', async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json(error.message)
    }
})


// get all items under a category, category is passed as params
router.get('/getItemsOfCategory/:category', async (req, res) => {
    try {
        //find the details of the specified category
        const categoryName = req.params.category.toLowerCase()
        const categoryDetails = await Category.findOne({name: categoryName})
        if(!categoryDetails) res.status(400).json("Category Not found!!") // if category does not exist

        // get the details of the items whose ids are in the items array of the category
        const items = categoryDetails.items // items array of the category
        const itemDetails = await Item.find({
            _id: { $in: items }
        })

        res.status(200).json(itemDetails) // return the items
    } catch (error) {
        res.status(500).json(error.message);
    }
})


// get all items under a subcategory, subcategory is passed as params
router.get('/getItemsOfSubcategory/:subcategory', async (req, res) => {
    try {
        //find the details of the specified subcategory
        const subcategoryName = req.params.subcategory.toLowerCase()
        const subcategoryDetails = await Subcategory.findOne({name: subcategoryName})
        if(!subcategoryDetails) res.status(400).json("Subcategory Not found!!") // if subcategory does not exist

        // get the details of the items whose ids are in the items array of the subcategory
        const items = subcategoryDetails.items // items array of the subcategory
        const itemDetails = await Item.find({
            _id: { $in: items }
        })

        res.status(200).json(itemDetails) // return the items
    } catch (error) {
        res.status(500).json(error.message)
    }
})


// get an item by name or id, when name or id are passed as query
router.get('/getItemByNameOrId', async (req, res) => {
    try {
        const itemName = req.query.name ? req.query.name.toLowerCase() : ""
        const itemId = req.query.id

        let item
        if(itemId) item = await Item.findById(itemId)
        else if(itemName) item = await Item.findOne({name: itemName})

        res.status(200).json(item)
    } catch (error) {
        res.status(500).json(error.message);
    }
})


// edit item
router.put('/editItem/:id', async (req, res) => {
    try {
        const itemId = req.params.id // id of the item to be editted
        const oldItem = await Item.findById(itemId) // details of the item before update
        
        let newItem
        if(!req.body.categoryName && !req.body.subcategoryName) // if neither category nor the subcategory of the item is to be updated
        {
            // updated item
            newItem = { 
                ...req.body, 
                name: req.body.name?.toLowerCase(),
                baseAmount: req.body.baseAmount ? req.body.baseAmount : oldItem.baseAmount,
                discount: req.body.discount ? req.body.discount : oldItem.discount,
            }
            newItem.totalAmount = newItem.baseAmount - newItem.discount;
        }
        else // if either category or the subcategory of the item is to be updated
        {
            // updated item
            newItem = {
                name: req.body.name?.toLowerCase(),
                image: req.body.image,
                description: req.body.description,
                taxApplicability: req.body.taxApplicability,
                tax: req.body.tax,
                baseAmount: req.body.baseAmount ? req.body.baseAmount : oldItem.baseAmount,
                discount: req.body.discount ? req.body.discount : oldItem.discount,
            }
            newItem.totalAmount = newItem.baseAmount - newItem.discount;

            if(req.body.categoryName) // if category is to be updated
            {
                //new category details
                const category = await Category.findOne({name: req.body.categoryName.toLowerCase()})
                if(!category) res.status(400).json("Category Not found!!") // if category does not exist
                
                // if item previously does not belongs to a category (or) the previous category is not same as new category
                if(!oldItem.categoryId || oldItem.categoryId.toString() !== category._id.toString())
                {
                    // add the item into the new category to be updated
                    const newItemsArray = [...category.items, itemId]
                    await Category.findByIdAndUpdate(category._id, {
                        $set: {items: newItemsArray}
                    },{new: true})

                    // remove the item from the previous category if the item previously belonged to a category
                    if(oldItem.categoryId)
                    {
                        const oldCategory = await Category.findById(oldItem.categoryId)
                        const itemsArray = oldCategory.items.filter(elem => elem.toString() !== itemId.toString())
                        await Category.findByIdAndUpdate(oldCategory._id, {
                            $set: {items: itemsArray}
                        },{new: true})
                    }

                    newItem.categoryId = category._id // updated item
                }
            }
            if(req.body.subcategoryName) // if subcategory is to be updated
            {
                //new subcategory details
                const subcategory = await Subcategory.findOne({name: req.body.subcategoryName.toLowerCase()})
                if(!subcategory) res.status(400).json("Sub Category Not found!!") // if subcategory does not exist
                
                // if item previously does not belongs to a subcategory (or) the previous subcategory is not same as new subcategory
                if(!oldItem.subcategoryId || oldItem.subcategoryId.toString() !== subcategory._id.toString())
                {
                    // add the item into the new subcategory to be updated
                    const newItemsArray = [...subcategory.items, itemId]
                    await Subcategory.findByIdAndUpdate(subcategory._id, {
                        $set: {items: newItemsArray}
                    },{new: true})

                    // remove the item from the previous subcategory if the item previously belonged to a subcategory
                    if(oldItem.subcategoryId)
                    {
                        const oldSubcategory = await Subcategory.findById(oldItem.subcategoryId)
                        const itemsArray = oldSubcategory.items.filter(elem => elem.toString() !== itemId.toString())
                        await Subcategory.findByIdAndUpdate(oldSubcategory._id, {
                            $set: {items: itemsArray}
                        },{new: true})
                    }

                    newItem.subcategoryId = subcategory._id // updated item
                }
            }

        }

        // update the item
        const updatedItem = await Item.findByIdAndUpdate(itemId, {
            $set: newItem
        }, {new: true})

        res.status(200).json(updatedItem) // return the updated item
    } catch (error) {
        res.status(500).json(error.message)
    }
})


// search the item by its name, name is given in query
router.get('/searchItems', async (req, res) => {
    try {
        const name = req.query.name ? req.query.name.toLowerCase() : ""
        const condition = { name: { $regex: name, $options: 'i' } } // search condition - if the item.name contains the query.name

        const items = await Item.find(condition) // find all items based on the condition
        res.status(200).json(items) // return the items
    } catch (error) {
        res.status(500).json(error.message)
    }
})


module.exports = router