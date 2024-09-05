"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var http_status_1 = require("../constants/http_status");
exports.default = (function (req, res, next) {
    // Extracting the access token from the request headers
    var token = req.headers.access_token;
    // If no token, return 401 Unauthorized
    if (!token) {
        return res.status(http_status_1.HTTP_UNAUTHORIZED).send();
    }
    try {
        // Verifying the token using the JWT_SECRET
        var decodedUser = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // If verification is successful, attaching the decoded user information to the request object
        req.user = decodedUser;
    }
    catch (error) {
        // If an error occurs during token verification, respond with 401 Unauthorized
        res.status(http_status_1.HTTP_UNAUTHORIZED).send();
    }
    // Continue to the next middleware or route handler
    return next();
});
