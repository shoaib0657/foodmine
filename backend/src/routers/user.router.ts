import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";
import auth from "../middlewares/auth.mid";

const router = Router();

router.get(
    "/seed",
    asyncHandler(async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if (usersCount > 0) {
            res.send("Sample users already seeded");
            return;
        }

        await UserModel.create(sample_users);
        res.send("Sample users seeded successfully");
    })
);

router.post(
    "/login",
    asyncHandler(async (req, res) => {
        // const body = req.body;
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.send(generateTokenResponse(user));
        } else {
            res.status(HTTP_BAD_REQUEST).send("User name or password is not valid!");
        }
    })
);

router.post(
    "/register",
    asyncHandler(async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(HTTP_BAD_REQUEST).send("User already exists!, please login!");
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10);

            const newUser: User = {
                id: "",
                name: name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                address: address,
                isAdmin: false,
            };
            const dbUser = await UserModel.create(newUser);
            res.send(generateTokenResponse(dbUser));
        }
    })
);

router.put(
    "/updateProfile",
    auth,
    asyncHandler(async (req: any, res) => {
        const { name, address } = req.body;
        const user = await UserModel.findByIdAndUpdate(
            req.user.id,
            { name, address },
            { new: true }
        );

        if (user) {
            res.send(generateTokenResponse(user));
        } else {
            res.status(HTTP_BAD_REQUEST).send("User not found!");
        }

        // OR res.send(generateTokenResponse(user!));
    })
);

router.put(
    "/changePassword",
    auth,
    asyncHandler(async (req: any, res) => {
        const { currentPassword, newPassword } = req.body;
        const user = await UserModel.findById(req.user.id);

        if (!user) {
            res.status(HTTP_BAD_REQUEST).send("User not found!");
            return;
        }

        const equal = await bcrypt.compare(currentPassword, user.password);
        if (!equal) {
            res.status(HTTP_BAD_REQUEST).send("Curent Password Is Not Correct!");
        } else {
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            res.send();
        }
    })
);

const generateTokenResponse = (user: User) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "30d",
        }
    );

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token,
    };
};

export default router;
