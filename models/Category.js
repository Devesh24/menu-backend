const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // always stored in lowercase
    image: { type: String },
    description: { type: String , required: true},
    taxApplicability: { type: Boolean, required: true },
    tax: { type: Number, default: null },
    taxType: { type: String, default: null },
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }], // array of ids of the subcategories
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] //array of ids of items
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
