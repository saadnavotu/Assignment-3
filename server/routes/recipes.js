let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to package model
let Recipe = require('../model/recipe');

// Get route for displaying all recipes - READ Operation
router.get('/', async (req, res, next) => {
    try {
        const RecipeList = await Recipe.find();
        res.render('Recipes/list', {
            title: 'Recipes',
            RecipeList: RecipeList
        });
    }
    catch (err) {
        console.log(err);
        res.render('Recipes/list', {
            error: 'Error on the Server'
        });
    }
});

// GET route for displaying Add Page - CREATE Operation
router.get('/add', async (req, res, next) => {
    try {
        res.render('Recipes/add', {
            title: 'Add Recipe'
        });
    }
    catch (err) {
        console.log(err);
        res.render('Recipes/list', {
            error: 'Error on the Server'
        });
    }
});

// POST route for processing Add Page - CREATE Operation
router.post('/add', async (req, res, next) => {
    try {
        let newRecipe = Recipe({
            "name": req.body.name,
            "ingredients": req.body.ingredients,
            "instructions": req.body.instructions,
            "cookTime": req.body.cookTime
        });

        Recipe.create(newRecipe).then(() => {
            res.redirect('/recipes');
        });
    }
    catch (err) {
        console.log(err);
        res.render('Recipes/list', {
            error: 'Error on the Server'
        });
    }
});

// GET route for displaying Edit Page - UPDATE Operation
router.get('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id
        const recipeToEdit = await Recipe.findById(id);

        res.render('Recipes/edit', {
            title: 'Edit Recipe',
            Recipe: recipeToEdit
        });
    }
    catch(err) {
        console.log(err);
        next(err);
    }
});

// POST route for processing Edit Page - UPDATE Operation
router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;

        let updatedRecipe = Recipe({
            "_id": id,
            "name": req.body.name,
            "ingredients": req.body.ingredients,
            "instructions": req.body.instructions,
            "cookTime": req.body.cookTime
        });

        Recipe.findByIdAndUpdate(id, updatedRecipe).then(() => {
            res.redirect('/recipes');
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

// GET route to perform Delete Operation
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;

        Recipe.deleteOne({ _id: id }).then(() => {
            res.redirect('/recipes');
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
