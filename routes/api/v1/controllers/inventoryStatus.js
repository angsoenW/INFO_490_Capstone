import { promises as fs } from 'fs'
import express from 'express'
import fetch from 'node-fetch';

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
            //let inventory = await req.models.Inventory.findById({ _id: req.query.ingredient })
            let inventory = await req.models.Inventory.findOne({ username: req.session.account.username })
            const purchaseDate = req.body.purchaseDate
            const ingredient = req.body.ingredient
            const shelfLifeDays = req.body.shelfLifeDays
            if (inventory) {
                let newItem = await req.models.Item.create({
                    ingredient,
                    purchaseDate,
                    shelfLifeDays: shelfLifeDays
                })
                inventory.contents.push(newItem)
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
            inventory.contents.pull({ _id: req.query.ingredient })
            await inventory.save()
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