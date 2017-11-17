const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
        product_name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        price: String,
        reviews: [String]
    },
    {
        timestamps: {updatedAt: 'lastModifiedDate', createdAt: ''}
    });

module.exports = productSchema;