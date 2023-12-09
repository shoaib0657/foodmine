import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

const router = Router();

router.get(
    "/seed",
    asyncHandler(async (req, res) => {
        const foodsCount = await FoodModel.countDocuments();
        if (foodsCount > 0) {
            res.send("Sample foods already seeded");
            return;
        }

        await FoodModel.create(sample_foods);
        res.send("Sample foods seeded successfully");
    })
);

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const foods = await FoodModel.find();
        res.send(foods);
    })
);

router.get("/search/:searchTerm", async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
});

router.get(
    "/tags",
    asyncHandler(async (req, res) => {
        const tags = await FoodModel.aggregate([
            { $unwind: "$tags" },
            { $group: { _id: "$tags", count: { $sum: 1 } } },
            { $project: { _id: 0, name: "$_id", count: "$count" } },
        ]).sort({ count: -1 });

        const all = {
            name: "All",
            count: await FoodModel.countDocuments(),
        };
        tags.unshift(all);
        res.send(tags);
    })
);

//not working
// app.get("/api/foods/tag/:tagName", (req, res) => {
//     const tagName = req.params.tagName.toLowerCase();
//     const foods = sample_foods.filter(food => food.tags?.includes(tagName));
//     res.send(foods);
// })

router.get(
    "/tag/:tagName",
    asyncHandler(async (req, res) => {
        const foods = await FoodModel.find({ tags: req.params.tagName });
        res.send(foods);
    })
);

router.get(
    "/:foodId",
    asyncHandler(async (req, res) => {
        const food = await FoodModel.findById(req.params.foodId);
        res.send(food);
    })
);

export default router;
