"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configCloudinary = void 0;
var cloudinary_1 = require("cloudinary");
var configCloudinary = function () {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return cloudinary_1.v2;
};
exports.configCloudinary = configCloudinary;
