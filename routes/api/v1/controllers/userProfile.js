import { promises as fs } from 'fs'
import express from 'express';

var router = express.Router();

router.get('/', async (req, res) => {
  try {
    let savedRecipe = await req.models.Recipe.findOne({ username: req.session.account.username })
    
    // Attempt to find the recipe by its ID

    if (savedRecipe) {
        res.status(200).json(savedRecipe.recipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }

  }
  catch (e) {
    res.status(500).json({ e: e.message })
  }
})

export default router