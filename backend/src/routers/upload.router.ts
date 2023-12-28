import { Router } from "express";
import adminMid from "../middlewares/admin.mid";
import multer from "multer";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { configCloudinary } from "../configs/cloudinary.config";

const router = Router();
const upload = multer();

router.post(
    "/",
    adminMid,
    upload.single("image"),
    asyncHandler(async (req, res) => {
        const file = req.file;
        if (!file) {
            res.status(HTTP_BAD_REQUEST).send("No File Uploaded!");
            return;
        }

        const imageUrl = await uploadImageToCloudinary(req.file?.buffer);
        res.send({ imageUrl });
    })
);

const uploadImageToCloudinary = (imageBuffer: Buffer | undefined) => {
    const cloudinary = configCloudinary();

    return new Promise((resolve, reject) => {
        if (!imageBuffer) reject(null);

        cloudinary.uploader
            .upload_stream((error, result) => {
                if (error || !result) reject(error);
                else resolve(result.url);
            })
            .end(imageBuffer);
    });
};

export default router;
