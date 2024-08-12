// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

// router logic

//Index
router.get('/', async (req, res) => {
    try {
        const foundRecipes = await Recipe.find({})
        res.render('recipes/index.ejs', {
            recipes: foundRecipes
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

//Show
router.get('/:recipeid', async (req, res) => {
    try {
        const foundRecipe = await Recipe.findOne({_id: req.params.recipeid }).populate('ingredients')
        res.render('recipes/show.ejs', {
            recipe: foundRecipe
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

  //Create - Form
router.get('/new', (req, res) => {
    res.render('recipes/new.ejs')
  })

  //Create - Post request
  router.post('/', async (req, res) => {
    try {
      const newRecipe = new Recipe(req.body);
      newRecipe.owner = req.session.user._id
      await newRecipe.save();
      res.redirect('/recipes')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
  });

module.exports = router;
