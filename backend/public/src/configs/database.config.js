"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
var mongoose_1 = require("mongoose");
var dbConnect = function () {
    (0, mongoose_1.connect)(process.env.MONGODB_URL).then(function () {
        console.log("Database connected successfully");
    }, function (error) {
        console.error("Database connection failed");
        console.error(error);
    });
};
exports.dbConnect = dbConnect;
