let mongoose = require('mongoose');

let recipeModel = mongoose.Schema({
    name: String,
    ingredients: String,
    instructions: String,
    cookTime: String
}, {
    collection: "recipes"
});

module.exports = mongoose.model('Recipe', recipeModel);
