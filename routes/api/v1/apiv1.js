import express from 'express'
var router = new express.Router()

import generateRouter from './controllers/generateRecipe.js'
import inventoryRouter from './controllers/inventoryStatus.js'
import recipeRouter from './controllers/recipe.js'
import usersRouter from './controllers/users.js'
import userProfile from './controllers/userProfile.js'

router.use('/generate', generateRouter)
router.use('/inventory', inventoryRouter)
router.use('/recipe', recipeRouter)
router.use('/users', usersRouter)
router.use('/userProfile', userProfile)


export default router