import { promises as fs } from 'fs'
import express from 'express'

var router = express.Router()

router.get('/', async (req, res) => {
    try {
        if (!req.session.isAuthenticated) {
            return res.status(401).json({
                status: "error",
                error: "not logged in"
            })
        }
        let inventory = await req.models.Inventory.find({ username: req.session.account.username })
        res.status(200).json(inventory)
    }
    catch (e) {
        res.status(500).json({ e: e.message })
    }
})

router.post('/', async (req, res) => {
    try {
        if (!req.session.isAuthenticated) {
            return res.status(401).json({
                status: "error",
                error: "not logged in"
            })
        }
        if (req.query.ingredient !== "add") {
            let inventory = await req.models.Inventory.findById({ _id: req.query.ingredient })
            const purchaseDate = req.body.purchaseDate
            const ingredients = req.body.ingredient.split(',').map(ingredient => ingredient.trim());
            if (inventory) {
                ingredients.forEach(async ingredient => {
                    let newItem = await req.models.Item.create({
                        ingredient,
                        purchaseDate,
                        shelfLifeDays: 10
                    })
                    inventory.contents.push(newItem)
                });
                await inventory.save()

            } else {
                let result = []

                ingredients.forEach(async ingredient => {

                    let newItem = req.models.Item.create({
                        ingredient,
                        purchaseDate,
                        shelfLifeDays: 10
                    })
                    result.push(newItem)
                })

                inventory = await req.models.Inventory.create({
                    username: [req.session.account.username],
                    contents: null
                })
            }
            await inventory.save()
            res.status(200).json(inventory)
        } else {
            let inventory = await req.models.Inventory.create({
                username: [req.session.account.username],
                contents: []
            })

            await inventory.save()
            res.status(200).json(inventory)
        }

    }
    catch (e) {
        res.status(500).json({ e: e.message })
    }
})

// TODO: DELETE METHOD STILL NEED TO BE FIXED. NOTHING GOT DELETED.
router.delete('/', async (req, res) => {
    try {
        if (!req.session.isAuthenticated) {
            return res.status(401).json({
                status: "error",
                error: "not logged in"
            })
        }
        // For grouping feature, use find instead of findOne
        let inventory = await req.models.Inventory.findOne({ username: req.session.account.username })
        if (inventory) {
            //let result = inventory.contents.id(req.query.ingredient)
            inventory.contents.pull({ _id: req.query.ingredients})

            // let resultItem
            // for (let item in inventory.contents) {
            //     if (item.findById({_id: req.query.ingredient})) {
            //         resultItem = item
            //         break
            //     }
            // }
            // inventory.contents.remove(resultItem)
            // await inventory.save()
            res.status(200).json(inventory)
        } else {
            res.status(204).json(inventory)
        }
    }
    catch (e) {
        res.status(500).json({ e: e.message })
    }
})

export default router