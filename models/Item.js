const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // always stored in lowercase
    image: { type: String },
    description: { type: String, required: true },
    taxApplicability: { type: Boolean, required: true },
    tax: { type: Number, default: null },
    baseAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number },
    subcategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }, // Optional if belongs to a subcategory
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Optional if belongs to a category
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
