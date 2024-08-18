const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // always stored in lowercase
    image: { type: String },
    description: { type: String, required: true },
    taxApplicability: { type: Boolean, default: null },
    tax: { type: Number, default: null },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] //array of ids of items
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);
module.exports = Subcategory;
