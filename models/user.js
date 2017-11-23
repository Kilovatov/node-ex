const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            validate: {
                validator: function (name) {
                    return /[A-Z][a-z]*/.test(name)
                },
                message: '{VALUE} is not a valid name'
            }
        },
        surname: String
    },
    {
        timestamps: {updatedAt: 'lastModifiedDate', createdAt: ''}
    });

module.exports = mongoose.model('Users', userSchema);