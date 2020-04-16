const mongoose = require('mongoose');

const CocktailSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    publish: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    ingredients: [
        {
            name: {
                type: String,
                required: true
            },
            amount: {
                type: String,
                required: true
            }
        }
    ],
    appraisals: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            appraisal: {
                type: Number,
                enum: [1,2,3,4,5],
                required: true
            }
        }
    ]
});

const Cocktail = mongoose.model('cocktail', CocktailSchema);

module.exports = Cocktail;