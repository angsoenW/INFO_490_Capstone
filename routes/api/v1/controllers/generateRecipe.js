import { promises as fs } from 'fs'
import express from 'express';
import axios from 'axios'

var router = express.Router();

router.get('/', async (req, res) => {

  try {
    console.log(req.query.ingredientsList)
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: "6b822790baca45e7ae127974d7410016",
        diet: req.query.diet,
        intolerances: req.query.intolerances,
        includeIngredients: req.query.ingredientsList,
        instructionsRequired: true,
        fillIngredients: true,
        addRecipeInformation: true
      }
    })

    let data = await response.data
    console.log(data);
    res.json(data)
  }
  catch (e) {
    res.status(500).json({ e: e.message })
  }
})

export default router