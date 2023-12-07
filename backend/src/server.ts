import express from "express";
import cors from "cors"
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken"

const app = express();
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

//Implement everything on food.service

app.get("/api/foods", (req, res) => {
    res.send(sample_foods);
})

app.get("/api/foods/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods);
})

app.get("/api/foods/tags", (req, res) => {
    res.send(sample_tags);
})

//not working
// app.get("/api/foods/tag/:tagName", (req, res) => {
//     const tagName = req.params.tagName.toLowerCase();
//     const foods = sample_foods.filter(food => food.tags?.includes(tagName));
//     res.send(foods);
// })

app.get("/api/foods/tag/:tagName", (req, res) => {
    try {
        const tagName = req.params.tagName.toLowerCase();
        const foods = sample_foods.filter(food => 
            food.tags?.map((tag: string) => tag.toLowerCase()).includes(tagName)
        );
        res.send(foods);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.get("/api/foods/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id === foodId);
    res.send(food);
})

app.post("/api/users/login", (req, res) => {
    // const body = req.body;
    const { email, password } = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password);

    if(user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("User name or password is not valid!")
    }
})

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d"
    })

    user.token = token;
    return user;
}

const port = 5000;

app.listen(port, () => {
    console.log(`Server started at http://localhost:` + port);
})