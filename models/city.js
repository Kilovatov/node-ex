const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const citySchema = new Schema({
        name: {
            type: String,
            validate: {
                validator: function (name) {
                    return /[A-Z].+/.test(name)
                },
                message: '{VALUE} is not a valid city name'
            }
        },
        country: {
            type: String,
            validate: {
                validator: function (name) {
                    return /[A-Z].+/.test(name)
                },
                message: '{VALUE} is not a valid country name'
            }
        },
        capital: {
            type: Boolean,
            required: true
        },
        location: {
            lat: Number,
            long: Number
        },
        id: {
            type: String,
            required: true
        },
    },
    {
        timestamps: {updatedAt: 'lastModifiedDate', createdAt: ''}
    });

module.exports = citySchema;